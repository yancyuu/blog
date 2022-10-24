---
title: python进阶之异步编程（基础篇）
summary: ✍️ 本文主要介绍异步和同步的区别以及如何用python实现，最后会结合微服务运行时dapr的python扩展下的异步框架actor作为实例，让你了解到异步更高级的用法。
published: '2022-10-22T14:49:00.000+08:00'
cover: ./cover.jpg
tags:
  - [Markdown]
  - [python]
  - [asyncio]
---
> 本文主要介绍异步和同步的区别以及实现方式，如何用python实现。
<kbd>非阻塞</kbd>

## ✨ 什么是异步？和同步的区别是什么？

> 同步是阻塞模式，异步是非阻塞模式。

- 同步就是指一个进程在执行某个请求的时候，若该请求需要一段时间才能返回信息，那么这个进程将会一直等待下去，直到收到返回信息才继续执行下去；

- 异步是指进程不需要一直等下去，而是继续执行下面的操作，不管其他进程的状态。当有消息返回时系统会通知进程进行处理，这样可以提高执行的效率。

- 同步和异步的差别就在于这条流水线上各个流程的执行顺序不同。


## ✨ 异步的核心思路
![同步业务流程图](/python-asyn/1.png)

如上图，当用户创建一笔电商交易订单时，要经历的业务逻辑流程还是很长的，每一步都要耗费一定的时间，那么整体的RT就会比较长。 于是，人们开始思考能不能将一些非核心业务从主流程中剥离出来，于是有了异步编程雏形，如下图。

![异步业务流程图](/python-asyn/2.png)

> 异步编程是让程序并发运行的一种手段。它允许多个事件同时发生，当程序调用需要长时间运行的方法时，它不会阻塞当前的执行流程，程序可以继续运行。
> 核心思路： 采用多线程优化性能，将串行操作变成并行操作。异步模式设计的程序可以显著减少线程等待，从而在高吞吐量场景中，极大提升系统的整体性能，显著降低时延。

## ✨ 异步的实现方式
<kbd>threading.Thread</kbd> <kbd>yield</kbd> <kbd>asyncio</kbd>

### 通过 threading.Thread 实现
```ts
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
import thread
import time
 
# 为线程定义一个函数
def print_time( threadName, delay):
   count = 0
   while count < 5:
      time.sleep(delay)
      count += 1
      print "%s: %s" % ( threadName, time.ctime(time.time()) )
 
# 创建两个线程
try:
   thread.start_new_thread( print_time, ("Thread-1", 2, ) )
   thread.start_new_thread( print_time, ("Thread-2", 4, ) )
except:
   print "Error: unable to start thread"
 
while 1:
   pass
```
输出如下
```ts
Thread-1: Thu Jan 22 15:42:17 2009
Thread-1: Thu Jan 22 15:42:19 2009
Thread-2: Thu Jan 22 15:42:19 2009
Thread-1: Thu Jan 22 15:42:21 2009
Thread-2: Thu Jan 22 15:42:23 2009
Thread-1: Thu Jan 22 15:42:23 2009
Thread-1: Thu Jan 22 15:42:25 2009
Thread-2: Thu Jan 22 15:42:27 2009
Thread-2: Thu Jan 22 15:42:31 2009
Thread-2: Thu Jan 22 15:42:35 2009
```
> 线程是cpu调度的最小单位，多线程运行的本质是对cpu资源的竞争，调用本质是系统级别的上下文切换，
> 一般用于io密集型应用，否则竞争不到线程锁，多线程也会变得毫无意义。

### 通过 yield 实现协程
- yield 可以让程序暂停运行，等待主程序发送数据，下次继续再yield处暂停。下面看一个例子通过yield实现协程。
- 使用yeild实现的协程时需要先用next激活，才能使用send发送数据。 next时会产生yield右边的数据，也就是name。 send时接收值的是yield左边的数据，也就是x。 协程结束时会抛出StopIteration。

<font color="#00dd00">实例代码如下</font><br />
```ts
def for_test():
    for i in range(3):
    yield i

def yield_yield_test():
    yield from range(3)

```

<font color="#00dd00">输出如下</font><br />
```ts
[0, 1, 2]
[0, 1, 2]
```
1. 线程是内核态，协程是用户态，。所以协程的切换不会耗费太多系统资源。
2. 协程的执行效率非常高。因为子程序切换不是线程切换，而是由程序自身控制，因此，没有线程耗费资源。
3. 和多线程比，线程数量越多，协程的性能优势就越明显，在处理大规模并发连接（IO密集型任务）时，协程要优于线程。
4. 协程不需要多线程的锁机制。在协程中控制共享资源不加锁，只需要判断状态就好了。

tips:
> 利用多核CPU最简单的方法是多进程+协程，既充分利用多核，又充分发挥协程的高效率，
> 可获得极高的性能。

### 通过异步io asyncio 实现（asyncio 实现）

- 异步IO的asyncio库使用时间循环驱动的协程实现并发。用户可自主控制程序， 在认为耗时处添加 yield from。
- 在 asyncio 中，协程使用@asyncio.coroutine 来装饰 。使用 yield from 来驱动。在Python 3.5版本做了如下更改：

```
@asyncio.coroutine --> async def
yield from --> await
```

#### asyncio 中的几个概念：

1. 事件循环
   管理所有的事件，在整个程序运行过程中不断循环执行并追踪事件发生的顺序将它们
   放在队列中，空闲时调用相应的事件处理者来处理这些事件。 
2. Fucture   
    Future对象表示尚未完成的计算，还未完成的结果
3. Task
      是Future的子类，作用是在运行某个任务的同时可以并发的运行多个任务。
4. asyncio.Task用于实现协作式多任务的库，且Task对象不能用户手动实例化，通过下面2个函数创建：
      asyncio.async()
      loop.create_task() 或 asyncio.ensure_future()

<font color="#00dd00">最简单的实例代码如下</font><br />
```ts
import asyncio
    async def coroutine_example():
        await asyncio.sleep(1)
        print ('Fosen')

if __name__ == "__main__":
    coro = coroutine_example()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(coro)
    loop.close()
```

<font color="#00dd00">输出如下</font><br />
```ts
    暂停一秒后，打印“Fosen”
```

- 这是最简单的异步IO示例，阻塞调用，直到协程运行结束才返回。 参数是future，传入协程对象时内部会自动变为future。
- asyncio.sleep():模拟IO操作，这样的休眠不会阻塞事件循环，前面加上await后会把控制权交给主事件循环，在休眠(IO操作)结束后恢复这个协程。

tips:
> 若在协程中需要有延时操作，应该使用 await asyncio.sleep()，而不是使用time.sleep()。
> 因为使用time.sleep()后会释放GIL，阻塞整个主线程，从而阻塞整个事件循环。
   
### 动态添加协程--同步方式 

- 创建一个线程，使事件循环在该线程中永久运行。
- 通过 new_loop.call_soon_threadsafe 来添加协程任务。

<font color="#00dd00">实例代码如下</font><br />
```ts
import asyncio
from threading import Thread
def start_thread_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()

def thread_example(name):
    print ('正在执行：', name)
    return '返回结果：' + name

if __name__ == "__main__":
    new_loop = asyncio.new_event_loop()
    t = Thread(target=start_thread_loop, args=(new_loop,))
    t.start()
    handle = new_loop.call_soon_threadsafe(thread_example, '1')
    handle.cancel()
    new_loop.call_soon_threadsafe(thread_example, '2')
    print ('主线程不阻塞')
    new_loop.call_soon_threadsafe(thread_example, '3')
    print ('继续运行中...')
```

<font color="#00dd00">输出如下</font><br />
```ts
    正在执行： 2
    主线程不阻塞
    继续运行中...
    正在执行： 3
```

tips:
> 同步的好处是，当运行的程序有先后顺序关系，则避免了一些并发会带来的问题。

### 动态添加协程--异步方式（actor模型即为这种模式）

- 创建一个线程来永久运行事件循环。不同的是 thread_example为一个协程函数。
- 通过 asyncio.run_coroutine_threadsafe 来添加协程任务。
- t.setDaemon(True) 表示把子线程设为守护线程，防止主线程已经退出了子线程还没退出。

<font color="#00dd00">实例代码如下</font><br />
```ts
import asyncio
from threading import Thread
def start_thread_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()

async def thread_example(name):
    print ('正在执行：', name)
    await asyncio.sleep(1)
    return '返回结果：' + name

if __name__ == "__main__":
    new_loop = asyncio.new_event_loop()
    t = Thread(target=start_thread_loop, args=(new_loop,))
    t.setDaemon(True)
    t.start()
    future = asyncio.run_coroutine_threadsafe(thread_example('1'), new_loop)
    print (future.result())
    asyncio.run_coroutine_threadsafe(thread_example('2'), new_loop)
    print ('主线程不阻塞') 
    asyncio.run_coroutine_threadsafe(thread_example('3'), new_loop)
    print ('继续运行中...')
```

<font color="#00dd00">输出如下</font><br />
```ts
    正在执行： 1
    返回结果：1  
    主线程不阻塞    
    正在执行： 2    
    继续运行中...   
    正在执行： 3
```

### 协程中生产-消费模型设计

- 结合上面的动态异步添加协程的思想，我们设计两个生产-消费模型，分别基于Python内置队列和Redis队列。
- 基于Python 内置双向队列的生产-消费模型


<font color="#00dd00">实例代码如下</font><br />
```ts
import asyncio
from threading import Thread
from collections import deque
import random
import time

def start_thread_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()

def consumer():
    while True:
    if dp:
        msg = dp.pop()
        if msg:
            asyncio.run_coroutine_threadsafe(thread_example('Fosen_{}'.format(msg)), new_loop)

async def thread_example(name):
    print ('正在执行：', name)
    await asyncio.sleep(2)
    return '返回结果：' + name

if __name__ == "__main__":
    dp = deque()
    new_loop = asyncio.new_event_loop()
    loop_thread = Thread(target=start_thread_loop, args=(new_loop,))
    loop_thread.setDaemon(True)
    loop_thread.start()
    consumer_thread = Thread(target=consumer)
    consumer_thread.setDaemon(True)
    consumer_thread.start()
    while True:
        i = random.randint(1, 10)
        dp.appendleft(str(i))
        time.sleep(2)
```

<font color="#00dd00">输出如下</font><br />
```ts
    正在执行： Fosen_6
    正在执行： Fosen_2
    正在执行： Fosen_8
    正在执行： Fosen_2
    正在执行： Fosen_1
    正在执行： Fosen_3
    正在执行： Fosen_1
```

### 基于 Redis 队列的生产-消费模型

- 这种写法与基于python队列的相似，只是操作队列、获取数据的方式不同而已。

<font color="#00dd00">实例代码如下</font><br />
```ts
import asyncio
from threading import Thread
import redis

# 生产者代码
def producer():
    for i in range(4):
    redis_conn.lpush('Fosen', str(i))

# 消费者代码
def get_redis():
    conn_pool = redis.ConnectionPool(host='127.0.0.1', port=6379)
    return redis.Redis(connection_pool=conn_pool)

def start_thread_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()

async def thread_example(name):
    print ('正在执行：', name)
    await asyncio.sleep(2)
    return '返回结果：' + name

if __name__ == "__main__":
    redis_conn = get_redis()
    producer()
    new_loop = asyncio.new_event_loop()
    loop_thread = Thread(target=start_thread_loop, args=(new_loop,))
    loop_thread.setDaemon(True)
    loop_thread.start()
    while True:
        msg = redis_conn.rpop('Fosen')
        if msg:
        asyncio.run_coroutine_threadsafe(thread_example('Fosen_{}'.format(msg)), new_loop)
```

<font color="#00dd00">输出如下</font><br />
```ts
    正在执行： Fosen_b'0'
    正在执行： Fosen_b'1'
    正在执行： Fosen_b'2'
    正在执行： Fosen_b'3'
```

## ✨补充：

- 上文中提到了asyncio，初此接触这个库，我写的代码处处翻车，网上资料良莠不齐，这里给大家一个[终极文档](https://bbc.github.io/cloudfit-public-docs/asyncio/asyncio-part-1)。
- 🚀 不定时分享干货，有兴趣的可以关注我公众号。

<div align="center"><img src="https://my-bucket-1259813675.cos-website.ap-guangzhou.myqcloud.com/wordpress/2022/05/20220504120500968-300x300.jpg">
</div>

