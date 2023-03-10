JS相关
一、js的基本数据类型有哪些，引用类型
基本数据类型:字符串（String）、数字（Number）、布尔（Boolean）、空（Null）、未定义（Undefined）、Symbol；
引用数据类型：对象（Object）、数组（Array）、函数（Function）。
二、数组的操作函数及返回值
1：push 尾部 返回更新后的数组长度，pop，并返回弹出的元素
join，作用是将数组各个元素是通过指定的分隔符进行连接成为一个字符串。其作用和toString()相同
shift，数组的开头添加一个或更多元素，并返回新的长度unshift，第一个元素从原数组中删除，并返回第一个元素的值

slice，返回一个新的数组，包含从 start 到 end 
splice，该方法用于插入、删除或替换数组的元素。
splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。
Concat 该方法用于连接两个或多个数组。它不会改变现有的数组，而仅仅会返回被连接数组的一个副本
三、浅拷贝 深拷贝
1浅拷贝 ：只复制指向某个对象的指针，而不复制对象本身，相当于是新建了一个对象，该对象复制了原对象的指针，新旧对象还是共用一个内存块
深拷贝：是新建一个一模一样的对象，该对象与原对象不共享内存，修改新对象也不会影响原对象

浅拷贝的实现方式 
1、Object.assign()
2、…Array.prototype.slice()
3、Array.prototype.concat()
4、解构
深拷贝的实现方法
1.JSON.parse(JSON.stringify())
缺点：当对象里面有函数的话，深拷贝后，函数会消失
2.手写递归
递归方法实现深度克隆原理：遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝
3.借助第三方库lodash
四、js的event loop  循环事件
1：当javascript代码执行的时候会将不同的变量存于内存中的不同位置：堆（heap）和栈（stack）中来加以区分
我们调用一个方法的时候，js会生成一个与这个方法对应的执行环境（context），又叫执行上下文。这个执行环境中存在着这个方法的私有作用域，上层作用域的指向，方法的参数，这个作用域中定义的变量以及这个作用域的this对象。 而当一系列方法被依次调用的时候，因为js是单线程的，同一时间只能执行一个方法，于是这些方法被排队在一个单独的地方。这个地方被称为执行栈。
当一个脚本第一次执行的时候，js引擎会解析这段代码，并将其中的同步代码按照执行顺序加入执行栈中，然后从头开始执行。如果当前执行的是一个方法，那么js会向执行栈中添加这个方法的执行环境，然后进入这个执行环境继续执行其中的代码。当这个执行环境中的代码 执行完毕并返回结果后，js会退出这个执行环境并把这个执行环境销毁，回到上一个方法的执行环境。。这个过程反复进行，直到执行栈中的代码全部执行完毕。
事件队列（Task Queue）。
js引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当一个异步事件返回结果后，js会将这个事件加入与当前执行栈不同的另一个队列，我们称之为事件队列。被放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。
以下事件属于宏任务：
整体代码script
setInterval()
setTimeout()
setImmediate
用户IO操作
ui render（dom渲染，即更改代码重新渲染dom的过程）、异步ajax等
微任务
Promise（then、catch、finally）、async/await、process.nextTick、Object.observe(⽤来实时监测js中对象的变化)
js代码在执行的时候，会先执行同步代码，遇到异步宏任务则将异步宏任务放入宏任务队列中，遇到异步微任务则将异步微任务放入微任务队列中，当所有同步代码执行完毕后，再将异步微任务从队列中调入主线程执行，微任务执行完毕后，再将异步宏任务从队列中调入主线程执行，一直循环至所有的任务执行完毕（完成一次事件循环EventLoop）。
每个异步宏任务执行完之后，都会检查是否存在待执行的微任务；如果有，则执行完所有的微任务之后，再继续执行下一个宏任务。
五、this指向问题bind  call apply区别
this
作为对象的方法调用
作为普通函数调用
构造器调用
class中的this调用
箭头函数中的this调用
call、apply和bind中的this调用
1. 作为对象的方法调用时， this 指向该对象
2. 作为普通函数调用，this 总是指向全局对象 window
3. 构造器调用, 当用 new 运算符调用函数时，该函数总是会返回一个对象，通常情况下，构造函数里的 this 就指向返回的这个对象
4..箭头函数中的this,es5中的this要看函数在什么地方调用（即要看运行时），通过谁是最后调用它该函数的对象来判断this指向
使用 call 、 apply或 bind等方法给 this传值，箭头函数会忽略。箭头函数引用的是箭头函数在创建时设置的 this值。
5.call、apply和bind中的this
call、apply、bind 被称之为 this 的强绑定，用来改变函数执行时的this指向，目前所有关于它们的运用，都是基于这一点来进行的。

call/apply区别，
apply()方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组
call()方法时，传递给函数的参数必须逐个列举出来。
call/apply改变了函数的this上下文后马上执行该函数
bind则是返回改变了上下文后的函数,不执行该函数
六、继承几种方式  ，instantof 
一、原型链继承
+ 缺点：
  + 1. 引用类型的属性被所有实例共享
  + 2. 在创建 Child 的实例时，不能向 Parent 传参
二、借用构造函数
  + 优点：
  + 1. 避免了引用类型的属性被所有实例共享
  + 2. 可以在 Child 中向 Parent 传参
  + 缺点：
  + 1. 方法都在构造函数中定义，每次创建实例都会创建一遍方法。
* 三、组合继承
  + 优点：
  + 1. 融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
* 四、原型式继承
  + 缺点：
  + 1. 包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
* 五、寄生式继承
  + 缺点：
  + 1. 跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
 六、寄生组合式继承
  + 优点：
  + 1. 这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent. prototype 上面创建不必要的、多余的属性。
  + 2. 与此同时，原型链还能保持不变；
  + 3. 因此，还能够正常使用 instanceof 和 isPrototypeOf。
  + 开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式
七、对象new的过程
// 1. 创建空对象；
var obj = {};
// 2. 设置原型链: 设置新对象的 constructor 属性为构造函数的名称，设置新对象的__proto__属性指向构造函数的 prototype 对象；
obj.constructor = Person;
obj.__proto__ = Person.prototype;
// 3. 改变this指向：使用新对象调用函数，函数中的 this 指向新实例对象obj：
var result = Person.call(obj); //{}.构造函数();
// 4. 返回值：如果无返回值或者返回一个非对象值，则将新对象返回；如果返回值是一个新对象的话那么直接返回该对象。
if (typeof(result) == "object") {
    person = result;
} else {
    person = obj;
}
八、创建对象的几种方式
第一种：Object 构造函数创建
第二种：使用对象字面量表示法
它们都是用了同一个接口创建很多对象，会产生大量的重复代码
第三种：使用工厂模式创建对象
第四种: 使用构造函数创建对象
就是每个方法都要在每个实例上重新创建一遍，方法指的就是我们在对象里面定义的函数。如果方法的数量很多，就会占用很多不必要的内存。于是出现了第五种创建对象的方法
第五种：原型创建对象模式
当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性。
第六种：组合使用构造函数模式和原型模式
九、重构的理解
1：
十、闭包
三大特性：
1、函数嵌套函数。
2、函数内部可以引用外部的参数和变量。
3、参数和变量不会被垃圾回收机制回收。
优点：
希望一个变量长期存储在内存中。
避免全局变量的污染。
私有成员的存在。
缺点：
常驻内存，增加内存使用量。
使用不当会很容易造成内存泄露。
由于在 ECMA2015 中，只有函数才能分割作用域，函数内部可以访问当前作用域的变量，但是外部无法访问函数内部的变量，所以闭包可以理解成“定义在一个函数内部的函数，外部可以通过内部返回的函数访问内部函数的变量“。在本质上，闭包是将函数内部和函数外部连接起来的桥梁。
十一、原型链
1：通过一个对象的__proto__可以找到它的原型对象，原型对象也是一个对象，就可以通过原型对象的__proto__，最后找到了我们的 Object. prototype, 从实例的原型对象开始一直到 Object. prototype 就是我们的原型链
十二、promise.all理解
1：
十三、slice splice
1：
十四、http缓存 / cookie、localStorage、sessionStorage /cookie一般用来干什么？和session有什么区别 
1：强制缓存
协商缓存。
强制缓存由 Cache-Control，Exipres（HTTP1.0）控制。浏览器直接读本地缓存，不会再跟服务器端交互，状态码 200。

协商缓存由 Last-Modified / IfModified-Since， Etag /If-None-Match实现，每次请求需要让服务器判断一下资源是否更新过，从而决定浏览器是否使用缓存，如果是，则返回 304，否则重新完整响应。
 共同点：都是保存在浏览器端、且同源的 
区别： 
1、cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递，而sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下 
2、存储大小限制也不同，cookie数据不能超过4K，同时因为每次http请求都会携带cookie、所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大 
3、数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭之前有效；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie：只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭 
4、作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localstorage在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的 
5、web Storage支持事件通知机制，可以将数据更新的通知发送给监听者 
6、web Storage的api接口使用更方便
十五、介绍token
cookie 是 http 规范，token 是自定义传递的。
cookie 没有被浏览器存储，下一次请求时便会带上，而 token 需要自己存储在浏览器，下一次请求时再请求头中带上。
token 默认没有跨域限制。
Token机制相对于Cookie机制的优势
支持跨域访问：Cookie是不允许垮域访问的，这一点对Token机制是不存在的，前提是传输的用户认证信息通过HTTP头传输。
无状态(也称：服务端可扩展性)：Token机制在服务端不需要存储session信息，因为Token 自身包含了所有登录用户的信息，只需要在客户端的cookie或本地介质存储状态信息。
更适用CDN：可以通过内容分发网络请求你服务端的所有资料（如：javascript，HTML,图片等），而你的服务端只要提供API即可。
去耦：不需要绑定到一个特定的身份验证方案。Token可以在任何地方生成，只要在你的API被调用的时候，你可以进行Token生成调用即可。
CSRF：因为不再依赖于Cookie，所以你就不需要考虑对CSRF（跨站请求伪造）的防范。
性能：一次网络往返时间（通过数据库查询session信息）总比作一次HMACSHA256计算 的Token验证和解析要费时得多。
十六、http状态码
1：
十七、url 到页面渲染完成的过程
1、首先是URL地址解析
浏览器会判断输入的是一个合法的URL还是一个待搜索的关键词，并且根据输入的内容自动完成字符编码等操作
2、接着发起真正的URL请求，如果浏览器本地缓存了这个url请求所需的资源，则会直接将数据转发给浏览器进程，如果没有缓存，则会查询DNS域名解析，首先查找浏览器有没有DNS缓存（比如之前有访问记录），如果有则返回IP。如果没有就寻找本地的host文件，看看有没有域名记录，如果有则返回IP，如果本地host文件没有则直接向本地DNS服务器请求，如果还是没有，继续向上DNS服务器请求，直到返回。
3、浏览器拿到ip后，在向服务器发起http请求之前，会先和服务器建立TCP连接。
TCP连接的过程是什么？
答：其实就是三次握手。
第一次握手：客户端发送’SYN’数据包给服务端。
第二次握手：服务端接收到客户的数据包后，返回’SYN/ACK’数据发给客户端
第三次握手：浏览器收到服务端数据包后，发送’ACK’数据给服务端。

连接建立成功后，浏览器就可以开始发送http请求到服务器请求数据了。
每个http请求包含三个部分。
1、请求方法、请求地址、http协议版本（请求行）
2、请求头
3、请求正文
浏览器接收到来自服务器的响应资源后，如果响应资源进行了压缩，则需要进行解压。然后对响应资源做缓存，
接下里对资源进行解析。这些资源包括html、css和JavaScript等文件。
1、html通过html解析器输出dom树
2、css通过css解析器输出css规则
3、结果dom树和css规则，计算出dom书中每个节点的具体样式，生成渲染树。
4、浏览器根据渲染树开始布局和绘制，会触发回流和重绘
5、构建图层树，显示页面。
十八、跨域问题
1：
十九、重排（回流）、重绘
1. 简述重排的概念
浏览器下载完页面中的所有组件（HTML、JavaScript、CSS、图片）之后会解析生成两个内部数据结构（DOM 树和渲染树），DOM 树表示页面结构，渲染树表示 DOM 节点如何显示。重排是 DOM 元素的几何属性变化，DOM 树的结构变化，渲染树需要重新计算。
2. 简述重绘的概念
重绘是一个元素外观的改变所触发的浏览器行为，例如改变 visibility、outline、背景色等属性。浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。由于浏览器的流布局，对渲染树的计算通常只需要遍历一次就可以完成。但 table 及其内部元素除外，它可能需要多次计算才能确定好其在渲染树中节点的属性值，比同等元素要多花两倍时间，这就是我们尽量避免使用 table 布局页面的原因之一。
3. 简述重绘和重排的关系
重绘不会引起重排，但重排一定会引起重绘，一个元素的重排通常会带来一系列的反应，甚至触发整个文档的重排和重绘，性能代价是高昂的。
4. 什么情况下会触发重排？
页面渲染初始化时；（这个无法避免）
浏览器窗口改变尺寸；
元素尺寸改变时；
元素位置改变时；
元素内容改变时；
添加或删除可见的 DOM 元素时。
5. 重排优化有如下五种方法
将多次改变样式属性的操作合并成一次操作，减少 DOM 访问。
如果要批量添加 DOM，可以先让元素脱离文档流，操作完后再带入文档流，这样只会触发一次重排。（fragment 元素的应用）
将需要多次重排的元素，position 属性设为 absolute 或 fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。例如有动画效果的元素就最好设置为绝对定位。
由于 display 属性为 none 的元素不在渲染树中，对隐藏的元素操作不会引发其他元素的重排。如果要对一个元素进行复杂的操作时，可以先隐藏它，操作完成后再显示。这样只在隐藏和显示时触发两次重排。
在内存中多次操作节点，完成后再添加到文档中去。例如要异步获取表格数据，渲染到页面。可以先取得数据后在内存中构建整个表格的 html 片段，再一次性添加到文档中去，而不是循环添加每一行。
二十、JS性能化
1、使用 DocumentFragment 优化多次 append
2、通过模板元素 clone ，替代 createElement
3、使用一次 innerHTML 赋值代替构建 dom 元素
4、使用 firstChild 和 nextSibling 代替 childNodes 遍历 dom 元素
5、使用 Array 做为 StringBuffer ，代替字符串拼接的操作
6、将循环控制量保存到局部变量
7、顺序无关的遍历时，用 while 替代 for
8、将条件分支，按可能性顺序从高到低排列
9、在同一条件子的多（ >2 ）条件分支时，使用 switch 优于 if
10、使用三目运算符替代条件分支
11、需要不断执行的时候，优先考虑使用 setInterval
