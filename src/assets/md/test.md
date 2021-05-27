# 通过源码编译安装 python3.9

### 预备资料

1. [Python3.9.1 源码包](https://www.python.org/ftp/python/3.9.1/Python-3.9.1.tar.xz)

### 配置选项

1. `--prefix=` 安装的路径

   - 默认不指定 prefix（本人推荐），可执行文件默认放在/usr /local/bin，库文件默认放在/usr/local/lib，配置文件默认放在/usr/local/etc。其它的资源文件放在/usr /local/share
   - 指定 prefix，安装时所有文件在同一路径下，卸载时直接删除文件夹即可（他人教程推荐）

2. `--enable-optimizations`参数据说可以提升 10%的 Python 运行速度，不过会增加编译过程中所需要的时长
3. `--with-ensurepip=install`参数可以同时编译安装`pip`工具
4. `--enable-shared` 启用共享（本人理解是生成.so 文件），方便其他依赖 python 的一些内置库（比如 mysqlclient，OpenCV) 的资源的正常安装及使用

### 编译步骤

1. 解压源码压缩包: `tar -zxvf python3.x.x-*.tar.gz`
2. 进入 Python3.x.x 目录 `cd python3.x.x-*`
3. 执行配置选项 `./configure [--prefix=/usr/local] --enable-optimizations`--with-ensurepip=install --enable-shared
4. 编译 `make`
5. 安装 `sudo make install`

### 后续操作

1. 无`--prefix=`选项，默认情况下，终端执行`python3 --version`应该已经正常输出了，否则执行第三步
2. 有`--prefix=installPath`选项（installPath 为你安装的路径）记录下 installPath，执行第三步
3. - 无--prefix `sudo echo "/usr/local/lib" > /etc/ld.so.conf.d/libc.conf `
   - `sudo echo "installpath/lib" > /etc/ld.so.conf.d/python3.x.x.conf` installPath 替换为第二步记录的路径

4. `cat /etc/ld.so.conf` 查看输出是否包含`include /etc/ld.so.conf.d/*.conf` 这一行且这一行前无#号注释,若有#号则去除保存
5. 执行`sudo ldconfig`

### 完犊子

> 以上为本人踩坑记录，如有其他问题请自行查阅资料（🔍 面向搜索编程）

##### 终端回收站目录

`~/.local/share/Trash` 测试系统（树莓派 4b Raspberry Pi OS）其他系统可能不一样，应该是一样的

- 没有删除过文件可能目录不存在，可以手动新建
- 实际查看时其下还有其他目录，其中一个为 Files，如想测试回收站可使用 mv 命令移到该目录下
