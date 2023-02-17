VUE相关
一、VUE2生命周期函数
1.new Vue()实例化一个vue实例，然后init初始化event 和 lifecycle， 其实这个过程中分别调用了3个初始化函数（initLifecycle(), initEvents(), initRender()），分别初始化了生命周期，事件以及定义createElement函数，初始化生命周期时，定义了一些属性，比如表示当前状态生命周期状态得_isMounted ，_isDestroyed ，_isBeingDestroyed，表示keep-alive中组件状态的_inactive，而初始化event时，实际上就是定义了$once、$off、$emit、$on几个函数。而createElement函数是在初始化render时定义的（调用了initRender函数）
2.执行beforeCreate生命周期函数
3.beforeCreate执行完后，会开始进行数据初始化，这个过程，会定义data数据，方法以及事件，并且完成数据劫持observe以及给组件实例配置watcher观察者实例。这样，后续当数据发生变化时，才能感知到数据的变化并完成页面的渲染
4.执行created生命周期函数，所以，当这个函数执行的时候，我们已经可以拿到data下的数据以及methods下的方法了，所以在这里，我们可以开始调用方法进行数据请求了
5.created执行完后，我们可以看到，这里有个判断，判断当前是否有el参数(这里为什么需要判断，是因为我们后面的操作是会依赖这个el的，后面会详细说)，如果有，我们再看是否有template参数。如果没有el，那么我们会等待调用$mount(el)方法(后面会详细说)。
确保有了el后，继续往下走，判断当有template参数时，我们会选择去将template模板转换成render函数（其实在这前面是还有一个判断的，判断当前是否有render函数，如果有的话，则会直接去渲染当前的render函数，如果没有那么我们才开始去查找是否有template模板），如果没有template，那么我们就会直接将获取到的el（也就是我们常见的#app，#app里面可能还会有其他标签）编译成templae, 然后在将这个template转换成render函数。
6.之后再调用beforMount， 也就是说实际从creted到beforeMount之间，最主要的工作就是将模板或者el转换为render函数。并且我们可以看出一点，就是你不管是用el，还是用template, 或者是用我们最常用的.vue文件(如果是.vue文件，他其实是会先编译成为template)，最终他都是会被转换为render函数的。
7.beforeMount调用后，我们是不是要开始渲染render函数了，首先我们会先生产一个虚拟dom（用于后续数据发生变化时，新老虚拟dom对比计算），进行保存，然后再开始将render渲染成为真实的dom。渲染成真实dom后，会将渲染出来的真实dom替换掉原来的vm.$el（这一步我们可能不理解，请耐心往下看，后面我会举例说明）,然后再将替换后的$el append到我们的页面内。整个初步流程就算是走完了
8.之后再调用mounted，并将标识生命周期的一个属性_isMounted 置为true。所以mounted函数内，我们是可以操作dom的，因为这个时候dom已经渲染完成了。
9.再之后，只有当我们状态数据发生变化时,我们在触发beforeUpdate，要开始将我们变化后的数据渲染到页面上了（实际上这里是有个判断的，判断当前的_isMounted是不是为ture并且_isDestroyed是不是为false，也就是说，保证dom已经被挂载的情况下，且当前组件并未被销毁，才会走update流程）
10.beforeUpdate调用之后，我们又会重新生成一个新的虚拟dom(Vnode)，然后会拿这个最新的Vnode和原来的Vnode去做一个diff算，这里就涉及到一系列的计算，算出最小的更新范围，从而更新render函数中的最新数据，再将更新后的render函数渲染成真实dom。也就完成了我们的数据更新
11.然后再执行updated，所以updated里面也可以操作dom，并拿到最新更新后的dom。不过这里我要插一句话了，mouted和updated的执行，并不会等待所有子组件都被挂载完成后再执行，所以如果你希望所有视图都更新完毕后再做些什么事情，那么你最好在mouted或者updated中加一个$nextTick（），然后把要做的事情放在$netTick()中去做（至于为什么，以后讲到$nextTick再说吧）
12.再之后beforeDestroy没啥说的，实例销毁前，也就是说在这个函数内，你还是可以操作实例的
13.之后会做一系列的销毁动作，解除各种数据引用，移除事件监听，删除组件_watcher，删除子实例，删除自身self等。同时将实例属性_isDestroyed置为true
14.销毁完成后，再执行destroyed
二、VUE diff 原理
在vue中会维护一个和 DOM 节点对应的 vnode 对象。
vnode 的 children 数组中对应子节点的 vnode 对象，所以在 vue 中通过 vnode 和真实的 DOM 树进行映射，我们也称之为虚拟树。
正是有了虚拟树，当数据更新时。我们可以对比新数据构建的 vnode 和老数据构建的 oldVnode 的差异，来实现精准更新。
而我们对比差异的算法就是采用的 diff。通过 diff 对比虚拟树的差异，将差异通过打补丁（patch）的方式更新到对应的真实 DOM 节点上。
三、VUE双向绑定原理
vue响应式的原理，首先对象传入vue实例作为data对象时，首先被vue遍历所有属性，调用Object. defineProperty设置为getter和setter，每个组件都有一个watcher对象，在组件渲染的过程中，把相关的数据都注册成依赖，当数据发生setter变化时，会通知watcehr，从而更新相关联的组件
四、VUEX
 State、 Getter、Mutation 、Action、 Module
vuex的State特性
A、Vuex就是一个仓库，仓库里面放了很多对象。其中state就是数据源存放地，对应于一般Vue对象里面的data
B、state里面存放的数据是响应式的，Vue组件从store中读取数据，若是store中的数据发生改变，依赖这个数据的组件也会发生更新
C、它通过mapState把全局的 state 和 getters 映射到当前组件的 computed 计算属性中
 vuex的Getter特性
A、getters 可以对State进行计算操作，它就是Store的计算属性
B、 虽然在组件内也可以做计算属性，但是getters 可以在多组件之间复用
C、 如果一个状态只在一个组件内使用，是可以不用getters
 vuex的Mutation特性
Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态；Action 可以包含任意异步操作。
五、VUE组件传值，通信方式
方式1: props
1)	通过一般属性实现父向子通信
2)	通过函数属性实现子向父通信
3)	缺点: 隔代组件和兄弟组件间通信比较麻烦

方式2: vue自定义事件
1)	vue内置实现, 可以代替函数类型的props
  a.	绑定监听: <MyComp @eventName="callback"
  b.	触发(分发)事件: this.$emit("eventName", data)
2)	缺点: 只适合于子向父通信

方式3: 消息订阅与发布
1)	需要引入消息订阅与发布的实现库, 如: pubsub-js
  a.	订阅消息: PubSub.subscribe('msg', (msg, data)=>{})
  b.	发布消息: PubSub.publish(‘msg’, data)
2)	优点: 此方式可用于任意关系组件间通信

方式4: vuex
1)	是什么: vuex是vue官方提供的集中式管理vue多组件共享状态数据的vue插件
2)	优点: 对组件间关系没有限制, 且相比于pubsub库管理更集中, 更方便

方式5: slot
1)	是什么: 专门用来实现父向子传递带数据的标签
  a.	子组件
  b.	父组件
2)	注意: 通信的标签模板是在父组件中解析好后再传递给子组件的
六、computed，watch区别常用及对比
Computed本质是一个具备缓存的watcher，依赖的响应式属性变化才会重新计算并且更新视图。 适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。
Watch没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。常用于监听某一个值，当被监听的值发生变化时，执行对应的操作。 打开deep：true选项会深度监听对象中的属性，对对象中的每一项进行监听。 immediate: true 选项表示，初始化时就会先执行一遍该监听对应的操作
七、$.nextTick
是将回调函数延迟在下一次 dom 更新数据后调用，简单的理解是：当数据更新了，在 dom 中渲染后，自动执行该函数
Vue 生命周期的 created()钩子函数进行的 DOM 操作一定要放在 Vue. nextTick()的回调函数中，原因是在 created()钩子函数执行的时候 DOM 其实并未进行任何渲染，而此时进行 DOM 操作无异于徒劳，所以此处一定要将 DOM 操作的 js 代码放进 Vue. nextTick()的回调函数中。与之对应的就是 mounted 钩子函数，因为该钩子函数执行时所有的 DOM 挂载已完成。
在使用某个第三方插件时 ，希望在 vue 生成的某些 dom 动态发生变化时重新应用该插件
八、v-show、v-if
v-show 指令是通过修改元素的 display 的 CSS 属性让其显示或者隐藏
v-if 指令是直接销毁和重建 DOM 达到让元素显示和隐藏的效果
九、v-for、v-if
v-for 比 v-if 优先
1、v-for优先于v-if被解析；
2、如果同时出现，每次渲染都会先执行循环再判断条件，无论如何循环都不可避免，浪费了性能；
3、要避免出现这种情况，则在外层嵌套template，在这一层进行v-if判断，然后在内部进行v-for循环；
4、如果条件出现在循环内部，可通过计算属性提前过滤掉那些不需要显示的项；
十、keep-alive
keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
_ include - 字符串或正则表达，只有匹配的组件会被缓存
_ exclude - 字符串或正则表达式，任何匹配的组件都不会被缓存
十一、$route和$router的区别
$route 是路由信息对象，包括path，params，hash，query，fullPath，matched，name 等路由信息参数。
而 $router 是路由实例对象，包括了路由的跳转方法，钩子函数等
十二、vue-router
14.销毁完成后，再执行destroyed
十三、vue生命周期渲染（父子渲染顺序）
加载渲染过程
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated
父组件更新过程
父beforeUpdate->父updated
销毁过程
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

十四、vue 更新数组时触发视图更新的方法
1）Vue.set 响应式新增与修改数据
可以设置对象或数组的值，通过key或数组索引，可以触发视图更新
2）Vue.delete
3）数组对象直接修改属性
4）splice方法修改数组，可以触发视图更新
5）数组整体修改，可以触发视图更新
6）用Object.assign或lodash.assign可以为对象添加响应式属性
7） Vue包含一组观察数组变异的方法
以下变动的数组中Vue是不能检测到的，也不会触发视图更新。
1.通过索引直接设置项， 比如this.books[3]={…}
2.修改数组长度， 比如 this.books.length = 1;
两个问题都可以用splice来解决：
第一个问题 还可以用 set方法 this.$set(this.books,3,{…})

十五、import export 和 require 的区别export default和export不加default的区别
1：require属于commonjs(ES5)规范，import属于ES6规范。
2：require/export 一般用于服务端(NodeJS)开发。 import由于是ES6规范，需要使用babel-loader转换为require
3：浏览器中要使用require语法的话，需要引用requirejs插件
4：require是运行时调用，import是编译时调用。

export default和export不加default的区别
1.export与export default均可用于导出常量、函数、文件、模块等
2.你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用
3.在一个文件或模块中，export、import可以有多个，export default仅有一个
4.通过export方式导出，在导入时要加{ }，export default则不需要
十六、箭头函数的特点 与普通函数区别
1.简洁
2. 箭头函数没有自己的this
3. 箭头函数继承来的this指向永远不会改变
4. call()、apply()、bind()等方法不能改变箭头函数中this的指向
5. 箭头函数不能作为构造函数使用 
6. 箭头函数没有自己的arguments
7. 箭头函数没有prototype
箭头函数不同于传统JavaScript中的函数，箭头函数并没有属于⾃⼰的this，它所谓的this是捕获其所在上下⽂的 this 值，作为⾃⼰的 this 值，并且由于没有属于⾃⼰的this，所以是不会被new调⽤的，这个所谓的this也不会被改变。
十七、var、let、const区别
var定义的变量，可以预解析提前调用的结果是undefined，let定义的变量不能预解析，提前调用的结果是 报错。
var定义的变量，变量名称可以重复，效果是重复赋值，let定义的变量不能重复，否则执行报错。
var定义的变量作用域是全局/局部作用域。let定义的变量如果在{}中只能在{}中调用。
在循环语句中var定义的循环变量和使用let定义的循环变量。执行原理和执行效果不同。
const定义的变量，不能重复赋值
var声明的循环变量
在整个循环变量过程中只定义了一个循环变量i，每次循环都对这一个循环变量i进行重复赋值，也就是之后的循环变量数值会覆盖之前的循环变量数值，当循环结束后只有一个循环变量i，存储的是最终的循环变量数值。
let声明的循环变量
在整个循环过程中每次循环都相当于触发执行了一个{   }，每一个{   }对于let定义的变量就是一个独立的作用域，也就是每次循环let声明的循环变量都是一个人独立作用域中的循环变量，每一次循环中循环变量都会存储不同的数据数值，互相之间不会影响，不会覆盖，也就是每次循环let声明的循环变量都相当于是一个独立的变量，不会覆盖之前的数据数值。

十八、防抖、节流
防抖，等用户高频事件完了，再进行事件操作。
思路：事件触发后开启一个定时器，如果事件在这个定时器限定的时间内再次触发，则清除定时器，在写一个定时器，定时时间到则触发。
某个操作希望上一次的完成后再进行下一次，或者希望隔一段时间触发一次。
思路：我们可以设计一种类似控制阀门一样定期开放的函数，事件触发时让函数执行一次，然后关闭这个阀门，过了一段时间后再将这个阀门打开，再次触发事件。
防抖和节流区别：
防抖是触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间。适用于可以多次触发但触发只生效最后一次的场景。
节流是高频事件触发，但在n秒内只会执行一次，如果n秒内触发多次函数，只有一次生效，节流会稀释函数的执行频率。
十九、async/await
async/await 是ES7提出的基于Promise的解决异步的最终方案。
function get(){
return new Promise((resolve,reject)=>{
    setTimeout(()=>{
	resolve('获取成功')
},3000)
})
}
async function test(){
   let a =await get();
   conole.log(a)
}
test();

二十、说一下项目中权限控制
1
二十一、介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面
1、当修改了一个或多个文件；
2、文件系统接收更改并通知webpack；
3、webpack重新编译构建一个或多个模块，并通知HMR服务器进行更新；
4、HMR Server 使用webSocket通知HMR runtime 需要更新，HMR运行时通过HTTP请求更新jsonp；
5、HMR运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新。
