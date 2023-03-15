---
title: 手把手教你接入chatgpt微信聊天机器人
summary: ✍️ 聊天机器人一直是人工智能领域最令人着迷的应用之一。现在，借助OpenAI的ChatGPT模型，我们可以创建一个非常强大的聊天机器人，并且用Python来接入它！
published: '2023-03-15T14:14:00.000+08:00'
cover: ./cover.jpg
coverStyle: 'TOP'
tags:
  - [ChatGPT]
  - [python]
---

> 聊天机器人一直是人工智能领域最令人着迷的应用之一。现在，借助OpenAI的ChatGPT模型，我们可以创建一个非常强大的聊天机器人，只用几行代码就可以用Python来接入它！本文会介绍接入公众号或者个人微信的方法

## ✨ 前提条件


- python开发环境（python3.8）

- 需要在OpenAI的网站上获取API Key。注册OpenAI账号后，进入Dashboard，在API Keys选项卡中可以找到自己的API Key。加入我的知识星球看详细教程，完全免费。


## ✨ 接入公众号
这样可以更加灵活地控制聊天机器人的行为和输出，而不受第三方库的限制。同时，这种方式也可以方便地集成到您的其他 Python 项目中，从而实现更多的自动化任务

1. 我们需要先安装 openai 和 wechatpy 这两个库
2. 接下来，我们需要先获取公众号的 appid 和 appsecret，并且设置好接口的访问权限。在微信公众平台后台，我们需要进行以下操作
   1. 在 “开发 -> 基本配置” 页面获取 appid 和 appsecret
   2. 在 “开发 -> 接口权限” 页面，启用 “消息管理权限” 和 “网页服务权限”
3. 接下来，我们就可以开始编写代码了。我们需要先实现一个函数，用于发送消息到公众号：
    
   ```python
    from wechatpy import WeChatClient
    appid = "YOUR_APP_ID"
    appsecret = "YOUR_APP_SECRET"
    def send_message_to_wechat(access_token, openid, content):
        client = WeChatClient(appid, appsecret, access_token)
        client.message.send_text(openid, content)
    ```
    在函数中，我们使用 WeChatClient 类初始化了一个客户端，并且使用 message.send_text 方法发送了一条文本消息到指定用户的 openid。
4. 接下来，我们需要调用 OpenAI GPT API 来生成回复的文本内容。我们可以实现一个函数，用于调用 OpenAI GPT API：

    ```python
    import openai
    import json
    
    def generate_response(api_key, prompt):
        openai.api_key = api_key
        response = openai.Completion.create(engine="text-davinci-002", prompt=prompt, max_tokens=128, n=1,stop=None,temperature=0.7)
        return response.choices[0].text
    
    ```
    在函数中，我们使用 openai.Completion.create 方法调用了 OpenAI GPT API，生成回复的文本内容。在调用时，我们需要传递 API 密钥和调用参数，例如使用的 GPT 引擎、输入的文本提示、最大 token 数、生成的样本数等。
5. 最后，我们可以编写一个主函数，用于从微信服务器接收消息，调用 OpenAI GPT API 生成回复，然后将回复发送回用户。整体代码如下：

    ```python
    import openai
    from flask import request
    from wechatpy import parse_message
    from wechatpy.utils import check_signature
    from wechatpy import WeChatClient
    from wechatpy.exceptions import InvalidSignatureException
    
    appid = "your_wechat_appid"
    appsecret = "your_wechat_appsecret"
    token = "your_wechat_token"
    api_key = "your_openai_api_key"
    access_token = "your_wechat_access_token"
    openid = "your_wechat_openid"
        
    def send_message_to_wechat(access_token, openid, content):
        client = WeChatClient(appid, appsecret, access_token)
        client.message.send_text(openid, content)
        
    def generate_response(api_key, prompt):
        openai.api_key = api_key
        response = openai.Completion.create(engine="text-davinci-002", prompt=prompt, max_tokens=128, n=1,stop=None,temperature=0.7)
        return response.choices[0].text
    
    def main():
        while True:
            try:
                signature = request.args.get("signature", "")
                timestamp = request.args.get("timestamp", "")
                nonce = request.args.get("nonce", "")
                echo_str = request.args.get("echostr", "")
                check_signature(token, signature, timestamp, nonce)
                if request.method == "GET":
                    return echo_str
                else:
                    msg = parse_message(request.data)
                    if msg.type == "text":
                        prompt = msg.content
                        response_text = generate_response(api_key, prompt)
                        send_message_to_wechat(access_token, openid, response_text)
                    else:
                        send_message_to_wechat(access_token, openid, "Sorry, I can only reply text")
            except InvalidSignatureException as e:
                return e 
    
    ```

## ✨ 接入个人微信
在之前的内容中，我们用itchat很容易的讲图灵机器人api接入了我们的个人微信。实现代码很简单，简单回顾一下：

```python
import itchat
import requests

# 上传获得消息内容到图灵机器人
# api_key里面填你在图灵机器人里面获得的机器人的apiKey，可以为多个

class wechatRobot:
    api_key = ['your_api_key']
    flag = 0

    success_code = [100000, 200000]
    error_code = [40001]

    def setApikey(self, api_key):
        wechatRobot.api_key = api_key
        return wechatRobot

    @staticmethod
    def getMessage(msg):
        apiURL = 'https://www.tuling123.com/openapi/api'
        data = {'key': wechatRobot.api_key[wechatRobot.flag],
                'info': msg,
                'userid': 'yancy'
                }
        r = requests.post(apiURL, data=data).json()
        print(str(r))
        # 重试
        if r.get('code') not in wechatRobot.success_code:
            wechatRobot.flag += 1  # api标志位+1
            if wechatRobot.flag == len(wechatRobot.api_key) - 1:
                wechatRobot.flag = 0
                return 0
            data = {'key': wechatRobot.api_key[wechatRobot.flag],
                    'info': msg,
                    'userid': 'yancy'
                    }
            r = requests.post(apiURL, data=data).json()
        rst = r.get('text')
        print('答text：' + str(r))
        if r.get('url'):
            rst = r.get('text') + "\n" + r.get('url')
        return {'code': r.get('code'), 'data': rst}

    # 监听个人微信聊天
    @staticmethod
    @itchat.msg_register(itchat.content.TEXT)
    def return_message(msg):
        try:
            print('问：' + msg['Text'])
        except Exception as e:
            print(e)
        return wechatRobot.getMessage(msg['Text'])


# 监听微信群聊天
# @itchat.msg_register([itchat.content.TEXT],isGroupChat=True)
# def return_message(msg):
#   print('问：'+msg['Text'])
#   return getMessage(msg['Text'])

if __name__ == '__main__':
    wechatRobot()
    itchat.auto_login(hotReload=True)
    itchat.run()

```
现在我们尝试将它接入openai

1. 我们需要先安装 openai 和 itchat 这两个库
2. 在Python代码中导入itchat库，并使用itchat.auto_login()函数登录自己的微信账号

    ```python
    import itchat
    
    itchat.auto_login()
    
    ```
3. 编写函数，将itchat收到的文本消息作为OpenAI的输入，调用OpenAI的API生成回复。

4. 将OpenAI生成的回复通过itchat发送到个人微信账号上。
实现代码如下：

    ```python
    import openai
    import itchat
    
    # 配置 openai
    openai.api_key = "YOUR_API_KEY"
    
    # 配置 itchat
    itchat.auto_login(hotReload=True)
    
    # 创建微信好友聊天窗口
    friend = itchat.search_friends(name="FRIEND_NAME")[0]
    friend_username = friend["UserName"]
    
    # 监听微信消息，收到消息时自动回复
    @itchat.msg_register(itchat.content.TEXT)
    def reply_to_message(msg):
        # 从微信消息获取用户输入
        user_input = msg["Text"]
    
        # 使用 openai 进行文本生成
        model_engine = "text-davinci-002"
        prompt = "我想问" + user_input + "，答案是什么？"
        response = openai.Completion.create(
            engine=model_engine,
            prompt=prompt,
            max_tokens=100,
            n=1,
            stop=None,
            temperature=0.7,
        )
        answer = response.choices[0].text
    
        # 将 openai 返回的答案回复给用户
        itchat.send_msg(answer, friend_username)
    
    # 开始监听微信消息
    itchat.run()
    
    ```


## ✨补充：

- 对python有兴趣的小伙伴可以加入我的知识星球，最近将分享很多关于ChatGpt的有趣知识。
- 之后会开放转接api给无法使用chatgpt的小伙伴使用。
- 🚀 不定时分享干货，有兴趣的可以关注我公众号。

<div align="center"><img src="https://my-bucket-1259813675.cos-website.ap-guangzhou.myqcloud.com/wordpress/2022/05/20220504120500968-300x300.jpg">
</div>


