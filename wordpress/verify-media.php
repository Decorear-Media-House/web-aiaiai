<?php
/**
 * Verify every image basename referenced in export-data.json / wp-meta-sync.json
 * exists in wordpress/uploads/. Reports missing files so the seed flow doesn't
 * silently produce posts with broken thumbnails.
 *
 * Usage (inside wp-cli container):
 *   wp --allow-root eval-file /seed/verify-media.php
 *
 * Or standalone (no WP required):
 *   php wordpress/verify-media.php
 */

$base = __DIR__;
$uploads_dir = "$base/uploads";
if (!is_dir($uploads_dir)) {
    fwrite(STDERR, "uploads/ not found at $uploads_dir\n");
    exit(1);
}

$have = [];
foreach (scandir($uploads_dir) as $f) {
    if ($f === '.' || $f === '..' || is_dir("$uploads_dir/$f")) continue;
    $have[$f] = true;
}

$need = [];
$sources = [];

// Collect every "http(s)://…/file.ext" reference from a JSON tree.
$collect = function ($node, $source) use (&$collect, &$need, &$sources) {
    if (is_string($node)) {
        if (preg_match_all('#https?://[^\s"\']+\.(?:png|jpe?g|webp|svg|gif|mp4)#i', $node, $m)) {
            foreach ($m[0] as $url) {
                $basename = basename(parse_url($url, PHP_URL_PATH) ?: $url);
                $need[$basename] = true;
                $sources[$basename][] = $source;
            }
        }
        return;
    }
    if (is_array($node)) {
        foreach ($node as $v) $collect($v, $source);
    }
};

foreach (['export-data.json', 'wp-meta-sync.json'] as $file) {
    $path = "$base/$file";
    if (!file_exists($path)) {
        echo "skip: $file not present\n";
        continue;
    }
    $data = json_decode(file_get_contents($path), true);
    if (!is_array($data)) {
        echo "warn: $file is not valid JSON\n";
        continue;
    }

    // Explicit basename fields from export-data.php blog posts
    foreach ($data['_blog_posts'] ?? [] as $post) {
        $b = $post['featured_image_basename'] ?? '';
        if ($b) {
            $need[$b] = true;
            $sources[$b][] = "$file: blog '{$post['title']}' featured_image";
        }
    }
    if (!empty($data['_options']['_custom_logo_basename'])) {
        $b = $data['_options']['_custom_logo_basename'];
        $need[$b] = true;
        $sources[$b][] = "$file: custom_logo";
    }
    $collect($data, $file);
}

$missing = array_diff_key($need, $have);
$total = count($need);
$found = $total - count($missing);

echo "\nMedia references: $total total, $found found in uploads/, " . count($missing) . " missing\n";

if (!$missing) {
    echo "OK: every referenced image is present.\n";
    exit(0);
}

echo "\nMissing:\n";
ksort($missing);
foreach (array_keys($missing) as $basename) {
    echo "  - $basename\n";
    foreach (array_unique($sources[$basename] ?? []) as $src) {
        echo "      ← $src\n";
    }
}
exit(1);
