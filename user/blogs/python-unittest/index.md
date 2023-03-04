---
title: python进阶之unittest模块的使用（实用篇）
summary: ✍️ 在编写Python代码时，测试是不可或缺的。使用测试可以有效地减少Bug并提高代码质量。Python自带了一个内置的测试框架——unittest模块，它可以帮助我们编写和运行测试用例。
unittest模块的基础
published: '2023-03-04T14:49:00.000+08:00'
cover: ./cover.jpg
coverStyle: 'TOP'
tags:
  - [Markdown]
  - [python]
  - [unittest]
  - [测试]
---

## ✨ unittest模块的基础

> unittest模块是Python内置的测试框架。它提供了测试工具和测试运行器，可以帮助我们创建测试用例并运行它们。unittest模块的基本用法是创建测试用例、编写测试方法并运行测试用例。

以下是一个使用unittest模块编写测试用例的示例：

```python
import unittest

class TeststringMethods(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        # 检查s.split不会改变s本身
        self.assertEqual(s, 'hello world')

if __name__ == '__main__':
    unittest.main()

```
在这个示例中，我们定义了一个名为TespythontringMethods的测试用例，并在其中定义了三个测试方法：test_upper()、test_isupper()和test_split()。这些测试方法用于测试字符串方法的正确性。例如，test_upper()方法测试upper()方法是否可以将字符串转换为大写字母，并检查它是否符合我们的预期。

## ✨ 运行测试用例
> 在编写测试用例后，我们需要运行它们以确保代码的正确性。unittest模块提供了几种运行测试用例的方法。最常用的方法是使用unittest.main()函数。我们可以在代码的末尾添加以下代码：

```python
import unittest
if __name__ == '__main__':
    unittest.main()
```
这将运行所有测试方法，并输出测试结果。

还有其他运行测试用例的方法，例如使用unittest.TextTestRunner()和unittest.TestLoader()类。例如，我们可以使用TextTestRunner运行测试用例：

```python
import unittest

class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        # 检查s.split不会改变s本身
        self.assertEqual(s, 'hello world')

if __name__ == '__main__':
    # 创建测试套件
    suite = unittest.TestSuite()
    # 将测试用例添加到测试套件中
    suite.addTest(TestStringMethods('test_upper'))
    suite.addTest(TestStringMethods('test_isupper'))
    suite.addTest(TestStringMethods('test_split'))
    # 使用TextTestRunner运行测试套件
    runner = unittest.TextTestRunner()
    runner.run(suite)

```
这将创建一个测试套件，并将三个测试方法添加到测试套件中。然后，我们使用TextTestRunner运行测试套件并输出测试结果。



## 断言

在unittest模块中，断言是用于检查测试结果是否与预期结果相符的关键组成部分。unittest模块提供了很多不同类型的断言，包括：

-    assertEqual(a, b)：检查a和b是否相等
-    assertNotEqual(a, b)：检查a和b是否不相等
-    assertTrue(x)：检查x是否为True
-    assertFalse(x)：检查x是否为False
-    assertIs(a, b)：检查a和b是否是同一个对象
-    assertIsNot(a, b)：检查a和b是否不是同一个对象
-    assertIsNone(x)：检查x是否为None
-    assertIsNotNone(x)：检查x是否不为None
-    assertIn(a, b)：检查a是否在b中
-    assertNotIn(a, b)：检查a是否不在b中
-    assertIsInstance(a, b)：检查a是否是b的实例
-    assertNotIsInstance(a, b)：检查a是否不是b的实例

在前面的示例中，我们使用了多种不同类型的断言。例如，在test_upper()方法中，我们使用了assertEqual()断言来检查'foo'.upper()是否等于'FOO'。

## ✨高级用法：
在编写更复杂的测试时，我们可能需要使用一些高级unittest模块功能。以下是一些高级用法的示例：
### 1. setUp()和tearDown()方法
setUp()和tearDown()方法是unittest模块中常用的两个方法。在每个测试方法执行之前和之后，setUp()和tearDown()方法都会自动运行。setUp()方法用于初始化测试状态，tearDown()方法用于清理测试状态。例如，我们可以使用setUp()方法创建一个测试文件，并在tearDown()方法中删除该文件。
```python
import unittest
import tempfile
import os

class TestFileMethods(unittest.TestCase):

    def setUp(self):
        self.test_file = tempfile.NamedTemporaryFile(delete=False)

    def tearDown(self):
        os.remove(self.test_file.name)

    def test_write_file(self):
        with open(self.test_file.name, 'w') as f:
            f.write('hello world')
        with open(self.test_file.name, 'r') as f:
            content = f.read()
        self.assertEqual(content, 'hello world')

if __name__ == '__main__':
    unittest.main()

```
在这个示例中，我们创建了一个名为TestFileMethods的测试用例，并在其中定义了一个test_write_file()测试方法。在setUp()方法中，我们创建了一个临时文件，并在tearDown()方法中删除了该文件。test_write_file()方法测试是否可以将'hello world'写入文件，并检查文件内容是否与预期相符。
### 2.装饰器(装饰器是python特有的语法糖，不了解的请自行百度)
unittest模块支持使用装饰器来控制测试的行为。例如，我们可以使用@unittest.expectedFailure装饰器标记一个测试方法预期会失败。
```python
import unittest
def test_subtract(self):
    self.assertEqual(1 - 2, -1)

@unittest.expectedFailure
def test_divide(self):
    self.assertEqual(1 / 0, 0)

if __name__ == '__main__':
    unittest.main()
```
在这个示例中，我们定义了三个测试方法。test_add()和test_subtract()方法都是正常的测试方法。test_divide()方法预期会失败，因为我们试图将1除以0。我们使用@unittest.expectedFailure装饰器来标记test_divide()方法，以告诉unittest模块预期该测试方法会失败。
### 3.跳过测试

有时，在某些条件下，我们可能希望跳过某些测试。unittest模块提供了@unittest.skip装饰器来实现这一点。
```python
import unittest

class TestMathMethods(unittest.TestCase):

    def test_add(self):
        self.assertEqual(1 + 2, 3)

    @unittest.skip('skip subtract test')
    def test_subtract(self):
        self.assertEqual(1 - 2, -1)

    def test_multiply(self):
        self.assertEqual(2 * 3, 6)

if __name__ == '__main__':
    unittest.main()
```
在这个示例中，我们定义了三个测试方法。test_add()和test_multiply()方法都是正常的测试方法。test_subtract()方法被标记为跳过，因为我们使用了@unittest.skip('skip subtract test')装饰器。

## 结论
unittest模块是Python中一个非常有用的测试框架，它提供了一组强大的工具来编写和运行测试。本文中，我们介绍了unittest模块的基本用法，包括如何编写测试用例、测试方法和断言。我们还介绍了一些高级用法，包括setUp()和tearDown()方法、装饰器和跳过测试。希望本文能够帮助您更好地理解unittest模块，并编写更好的Python测试代码。

## ✨补充：

- 我的[个人博客](https://blog-yancyuu.vercel.app/)。
- 🚀 不定时分享干货，有兴趣的可以关注我公众号。

<div align="center"><img src="https://my-bucket-1259813675.cos-website.ap-guangzhou.myqcloud.com/wordpress/2022/05/20220504120500968-300x300.jpg">
</div>

