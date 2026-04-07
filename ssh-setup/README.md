# SSH Setup สำหรับ AIAIAI Deploy

## ขั้นตอน

### 1. เพิ่ม Public Key บน CloudPanel

เข้า https://cp.decorear.com/ แล้วเพิ่ม public key นี้ใน **ทั้ง 2 sites**:

**Site: aiaiai.decorear.com** → SSH/SFTP → Add Public Key
**Site: aiaiai-cms.decorear.com** → SSH/SFTP → Add Public Key

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIGlZgx8RvC/f8B1tFi3LNpP+gOQ5o73SH+INDmHc7bN aiaiai-deploy
```

### 2. เพิ่ม SSH Config

เพิ่มข้อความจากไฟล์ `ssh-config-append.txt` ไปต่อท้ายไฟล์ `~/.ssh/config`

### 3. Copy Private Key ไป Server (สำหรับ git clone)

เพิ่ม key ลงบน server ด้วย:
```bash
scp ~/.ssh/id_aiaiai aiaiai-deploy:~/.ssh/id_aiaiai
scp ~/.ssh/id_aiaiai.pub aiaiai-deploy:~/.ssh/id_aiaiai.pub
```

### 4. ทดสอบ

```bash
ssh aiaiai-deploy "echo Connected"
ssh aiaiai-cms "echo Connected"
```
