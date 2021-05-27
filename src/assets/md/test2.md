# curl

| -A  | 设置 user-agent                       | curl -A "Chrome" http://baidu.com                                   |
| :-- | ------------------------------------- | ------------------------------------------------------------------- |
| -X  | 用指定方法请求                        | Curl -X POST http://httpbin.org/post                                |
| -I  | 只返回请求的头信息                    |                                                                     |
| -d  | 以 POST 方法请求 url,并发送相应的参数 | 1. -d a=1 -d b=2<br />2. -d "a=1&b=2"<br />3. -d @filename          |
| -o  | 下载文件并以指定的文件名保存          | curl -o fox.jpeg http://httpbin.org/images/jpeg                     |
| -L  | 跟随重定向请求                        | curl -IL https://baidu.com                                          |
| -H  | 设置头信息                            | curl -o image.webp -H "accept: image/webp" http://httpbin.org/image |
| -k  | 允许发起不安全的 SSL 请求             |                                                                     |
| -b  | 设置 cookie                           | curl -b a=test http://httpbin.org/cookies                           |
| -s  | 不显示其他无关信息                    |                                                                     |
|     |                                       |                                                                     |

# wget

| -O           | 以指定文件名保存下载的文件   | wget -O test.png http://httpbin.org/image/png |
| ------------ | ---------------------------- | --------------------------------------------- |
| --limit-rate | 以指定的速度下载目标文件     | --limit-rate=200k                             |
| -c           | 断点续传                     |                                               |
| -b           | 后台下载                     |                                               |
| -U           | 设置 User-Agent              |                                               |
| --mirror     | 镜像某个网站                 |                                               |
| -p           | 下载页面中的所有相关资源     |                                               |
| -r           | 递归下载所有网页中的所有链接 |                                               |

# [httpie](https://httpie.io/docs#usage)
