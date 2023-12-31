**只有理解了JavaScrip的执⾏上下⽂，你才能更好地理解JavaScript语⾔本⾝**，⽐如变 量提升、作⽤域和闭包等。不仅如此，理解执⾏上下⽂和调⽤栈的概念还能助你成为⼀名更合格的前端开发 者。<br />不过由于我们专栏不是专⻔讲JavaScript语⾔的，所以我并不会对JavaScript语法本⾝做过多介绍。本⽂主 要是从JavaScript的顺序执⾏讲起，然后**⼀步步带你了解JavaScript是怎么运⾏的**。<br />接下来咱们先看段代码，你觉得下⾯这段代码输出的结果是什么？<br />showName() console.log(myname) var myname = '极客时间' function showName() {<br />console.log('函数showName被执⾏');<br />}<br />使⽤过JavaScript开发的程序员应该都知道，JavaScript是按顺序执⾏的。若按照这个逻辑来理解的话，那 么：<br />当执⾏到第1⾏的时候，由于函数showName还没有定义，所以执⾏应该会报错；<br />同样执⾏第2⾏的时候，由于变量myname函数也未定义，所以同样也会报错。<br />然⽽实际执⾏结果却并⾮如此， 如下图：<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/12475804/1688349932791-1168f3d7-f87b-4847-888d-d8796aa4f593.jpeg#averageHue=%23efecec&clientId=u4031fe5b-1996-4&from=paste&id=u31638fe1&originHeight=414&originWidth=722&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=uc9a01c65-eb8b-48ab-b5d2-e22bdb65626&title=)<br />在声明之前使⽤函数和变量的执⾏结果<br />第1⾏输出“函数showName被执⾏”，第2⾏输出“undeﬁned”，这和前⾯想象中的顺序执⾏有点不⼀样 啊！<br />通过上⾯的执⾏结果，你应该已经知道了函数或者变量可以在定义之前使⽤，那如果使⽤没有定义的变量或 者函数，JavaScript代码还能继续执⾏吗？为了验证这点，我们可以删除第3⾏变量myname的定义，如下 所⽰：<br />showName() console.log(myname) function showName() {<br />console.log('函数showName被执⾏');<br />}<br />然后再次执⾏这段代码时，JavaScript引擎就会报错，结果如下：<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/12475804/1688349932695-68fa5fef-1d8a-4547-8d8e-07052f1c61cb.jpeg#averageHue=%23f3e8e5&clientId=u4031fe5b-1996-4&from=paste&id=ucb5cc44e&originHeight=65&originWidth=1142&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u8839e466-df8a-4e06-b1a6-79da4a0e53a&title=)<br />使⽤了未定义的变量⸺执⾏报错从上⾯两段代码的执⾏结果来看，我们可以得出如下三个结论。

1. 在执⾏过程中，若使⽤了未声明的变量，那么JavaScript执⾏会报错。
2. 在⼀个变量定义之前使⽤它，不会出错，但是该变量的值会为undeﬁned，⽽不是定义时的值。
3. 在⼀个函数定义之前使⽤它，不会出错，且函数能正确执⾏。

第⼀个结论很好理解，因为变量没有定义，这样在执⾏JavaScript代码时，就找不到该变量，所以JavaScript会抛出错误。<br />但是对于第⼆个和第三个结论，就挺让⼈费解的：<br />变量和函数为什么能在其定义之前使⽤？这似乎表明JavaScript代码并不是⼀⾏⼀⾏执⾏的。<br />同样的⽅式，变量和函数的处理结果为什么不⼀样？⽐如上⾯的执⾏结果，提前使⽤的showName函数能打印出来完整结果，但是提前使⽤的myname变量值却是undeﬁned，⽽不是定义时使⽤的“极客时 间”这个值。
<a name="dpKj0"></a>
# 变量提升（Hoisting）
要解释这两个问题，你就需要先了解下什么是变量提升。<br />不过在介绍变量提升之前，我们先通过下⾯这段代码，来看看什么是JavaScript中的**声明**和**赋值**。<br />var myname = '极客时间'<br />这段代码你可以把它看成是两⾏代码组成的：<br />var myname //声明部分myname = '极客时间' //赋值部分<br />如下图所⽰：<br />![](https://cdn.nlark.com/yuque/0/2023/png/12475804/1688349932946-99d28dab-aba7-4f7c-9ee3-b25038ec313c.png#averageHue=%23fcf8f7&clientId=u4031fe5b-1996-4&from=paste&id=u701a061a&originHeight=493&originWidth=1281&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ube88060a-5d82-471e-85ad-30805db1c65&title=)<br />如何理解`var myname = '极客时间'`<br />上⾯是**变量**的声明和赋值，那接下来我们再来看看**函数**的声明和赋值，结合下⾯这段代码：<br />function foo(){ console.log('foo')<br />}<br />var bar = function(){ console.log('bar')<br />}<br />第⼀个函数foo是⼀个完整的函数声明，也就是说没有涉及到赋值操作；第⼆个函数是先声明变量bar，再把<br />function(){console.log('bar')}赋值给bar。为了直观理解，你可以参考下图：<br />![](https://cdn.nlark.com/yuque/0/2023/png/12475804/1688349932969-648ea58f-9aa0-46d2-9047-01a61741be50.png#averageHue=%23fdfafa&clientId=u4031fe5b-1996-4&from=paste&id=u2fd2414b&originHeight=727&originWidth=1281&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u0569eb8b-0758-4a30-ab41-d484e1199aa&title=)<br />函数的声明和赋值<br />好了，理解了声明和赋值操作，那接下来我们就可以聊聊什么是变量提升了。<br />**所谓的变量提升，是指在JavaScript代码执⾏过程中，JavaScript引擎把变量的声明部分和函数的声明部 分提升到代码开头的“⾏为”。变量被提升后，会给变量设置默认值，这个默认值就是我们熟悉的undeﬁned。**<br />下⾯我们来模拟下实现：
```
/*

/* 变量提升部分

*/

// 把变量 myname提升到开头，

// 同时给myname赋值为undefined

var myname = undefined

// 把函数showName提升到开头

function showName() { console.log('showName被调⽤');

}

/*

/* 可执⾏代码部分

*/ 
showName()

console.log(myname)

// 去掉var声明部分，保留赋值语句

myname = '极客时间'
```
为了模拟变量提升的效果，我们对代码做了以下调整，如下图：<br />![](https://cdn.nlark.com/yuque/0/2023/png/12475804/1688349932979-b24056d4-c050-4a8c-8f38-971c0a0f0b73.png#averageHue=%23fbf3ed&clientId=u4031fe5b-1996-4&from=paste&id=u865dbeba&originHeight=593&originWidth=1281&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=ud90e53e3-cfbe-4a12-a04c-a49a7d3f834&title=)<br />模拟变量提升⽰意图<br />从图中可以看出，对原来的代码主要做了两处调整：<br />第⼀处是把声明的部分都提升到了代码开头，如变量myname和函数showName，并给变量设置默认值undeﬁned；<br />第⼆处是移除原本声明的变量和函数，如var myname = '极客时间'的语句，移除了var声明，整个移除showName的函数声明。<br />通过这两步，就可以实现变量提升的效果。你也可以执⾏这段模拟变量提升的代码，其输出结果和第⼀段代 码应该是完全⼀样的。<br />通过这段模拟的变量提升代码，相信你已经明⽩了可以在定义之前使⽤变量或者函数的原因⸺**函数和变量 在执⾏之前都提升到了代码开头**。
<a name="gg1ak"></a>
# JavaScript代码的执⾏流程
从概念的字⾯意义上来看，“变量提升”意味着变量和函数的声明会在物理层⾯移动到代码的最前⾯，正如 我们所模拟的那样。但，这并不准确。**实际上变量和函数声明在代码⾥的位置是不会改变的，⽽且是在编译 阶段被JavaScript引擎放⼊内存中**。对，你没听错，⼀段JavaScript代码在执⾏之前需要被JavaScript引擎 编译，**编译**完成之后，才会进⼊**执⾏**阶段。⼤致流程你可以参考下图：<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/12475804/1688349933266-c36ce43b-0171-4a50-8a9d-622016c08a58.jpeg#averageHue=%23f7faf6&clientId=u4031fe5b-1996-4&from=paste&id=u25cc8479&originHeight=141&originWidth=1027&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u60afcc5c-bd44-4683-89e2-0bf40b6a455&title=)<br />JavaScript的执⾏流程图
<a name="YZe33"></a>
## 编译阶段
那么编译阶段和变量提升存在什么关系呢？<br />为了搞清楚这个问题，我们还是回过头来看上⾯那段模拟变量提升的代码，为了⽅便介绍，可以把这段代码 分成两部分。<br />**第⼀部分：变量提升部分的代码。**
```
var myname = undefined function showName() {

console.log('函数showName被执⾏');

}
```
**第⼆部分：执⾏部分的代码。**
```
showName() console.log(myname) myname = '极客时间'
```
下⾯我们就可以把JavaScript的执⾏流程细化，如下图所⽰：<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/12475804/1688349933471-2043735b-9b55-43dc-81be-9c88a6dd67b1.jpeg#averageHue=%23f7f7f3&clientId=u4031fe5b-1996-4&from=paste&id=ua147de08&originHeight=582&originWidth=1041&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u13e239c2-6f28-4aec-b388-9b3bbb3e8c3&title=)<br />JavaScript执⾏流程细化图<br />从上图可以看出，输⼊⼀段代码，经过编译后，会⽣成两部分内容：**执⾏上下⽂（Execution context）和可执⾏代码**。<br />**执⾏上下⽂是JavaScript执⾏⼀段代码时的运⾏环境**，⽐如调⽤⼀个函数，就会进⼊这个函数的执⾏上下<br />⽂，确定该函数在执⾏期间⽤到的诸如this、变量、对象以及函数等。<br />关于执⾏上下⽂的细节，我会在下⼀篇⽂章《08 | 调⽤栈：为什么JavaScript代码会出现栈溢出？》做详细<br />介绍，现在你只需要知道，在执⾏上下⽂中存在⼀个**变量环境的对象**（Viriable Environment），该对象中<br />保存了变量提升的内容，⽐如上⾯代码中的变量myname和函数showName，都保存在该对象中。<br />你可以简单地把变量环境对象看成是如下结构：
```
VariableEnvironment: myname -> undefined,

showName ->function : {console.log(myname)
```
了解完变量环境对象的结构后，接下来，我们再结合下⾯这段代码来分析下是如何⽣成变量环境对象的。
```
showName() console.log(myname) var myname = '极客时间' 

function showName() {

console.log('函数showName被执⾏');

}
```
我们可以⼀⾏⼀⾏来分析上述代码：<br />第1⾏和第2⾏，由于这两⾏代码不是声明操作，所以JavaScript引擎不会做任何处理；<br />第3⾏，由于这⾏是经过var声明的，因此JavaScript引擎将在环境对象中创建⼀个名为myname的属性， 并使⽤undeﬁned对其初始化；<br />第4⾏，JavaScript引擎发现了⼀个通过function定义的函数，所以它将函数定义存储到堆(HEAP）中， 并在环境对象中创建⼀个showName的属性，然后将该属性值指向堆中函数的位置（不了解堆也没关 系，JavaScript的执⾏堆和执⾏栈我会在后续⽂章中介绍）。<br />这样就⽣成了变量环境对象。接下来JavaScript引擎会把声明以外的代码编译为字节码，⾄于字节码的细 节，我也会在后⾯⽂章中做详细介绍，你可以类⽐如下的模拟代码：
```
showName() console.log(myname) myname = '极客时间'
```
好了，现在有了执⾏上下⽂和可执⾏代码了，那么接下来就到了执⾏阶段了。
<a name="uaW9B"></a>
## 执⾏阶段
JavaScript引擎开始执⾏“可执⾏代码”，按照顺序⼀⾏⼀⾏地执⾏。下⾯我们就来⼀⾏⼀⾏分析下这个执<br />⾏过程：<br />当执⾏到showName函数时，JavaScript引擎便开始在变量环境对象中查找该函数，由于变量环境对象中 存在该函数的引⽤，所以JavaScript引擎便开始执⾏该函数，并输出“函数showName被执⾏”结果。<br />接下来打印“myname”信息，JavaScript引擎继续在变量环境对象中查找该对象，由于变量环境存在myname变量，并且其值为undeﬁned，所以这时候就输出undeﬁned。<br />接下来执⾏第3⾏，把“极客时间”赋给myname变量，赋值后变量环境中的myname属性值改变为“极 客时间”，变量环境如下所⽰：
```
VariableEnvironment: myname -> "极客时间",

showName ->function : {console.log(myname)
```
好了，以上就是⼀段代码的编译和执⾏流程。实际上，编译阶段和执⾏阶段都是⾮常复杂的，包括了词法分 析、语法解析、代码优化、代码⽣成等，这些内容我会在《14 | 编译器和解释器：V8是如何执⾏⼀段JavaScript代码的？》那节详细介绍，在本篇⽂章中你只需要知道JavaScript代码经过编译⽣成了什么内容 就可以了。
<a name="ldPYt"></a>
# 代码中出现相同的变量或者函数怎么办？
现在你已经知道了，在执⾏⼀段JavaScript代码之前，会编译代码，并将代码中的函数和变量保存到执⾏上 下⽂的变量环境中，那么如果代码中出现了重名的函数或者变量，JavaScript引擎会如何处理？<br />我们先看下⾯这样⼀段代码：
```
function showName() { 

console.log('极客邦');

}

showName();

function showName() { 

console.log('极客时间');

}

showName();
```
在上⾯代码中，我们先定义了⼀个showName的函数，该函数打印出来“极客邦”；然后调⽤ showName，并定义了⼀个showName函数，这个showName函数打印出来的是“极客时间”；最后接着 继续调⽤showName。那么你能分析出来这两次调⽤打印出来的值是什么吗？<br />我们来分析下其完整执⾏流程：<br />**⾸先是编译阶段**。遇到了第⼀个showName函数，会将该函数体存放到变量环境中。接下来是第⼆个showName函数，继续存放⾄变量环境中，但是变量环境中已经存在⼀个showName函数了，此时，**第**<br />**⼆个showName函数会将第⼀个showName函数覆盖掉**。这样变量环境中就只存在第⼆个showName 函数了。<br />**接下来是执⾏阶段**。先执⾏第⼀个showName函数，但由于是从变量环境中查找showName函数，⽽变<br />量环境中只保存了第⼆个showName函数，所以最终调⽤的是第⼆个函数，打印的内容是“极客时间”。第⼆次执⾏showName函数也是⾛同样的流程，所以输出的结果也是“极客时间”。<br />综上所述，**⼀段代码如果定义了两个相同名字的函数，那么最终⽣效的是最后⼀个函数**。
<a name="GSw4n"></a>
# 总结
好了，今天就到这⾥，下⾯我来简单总结下今天的主要内容：<br />JavaScript代码执⾏过程中，需要先做**变量提升**，⽽之所以需要实现变量提升，是因为JavaScript代码在 执⾏之前需要先**编译**。<br />在**编译阶段**，变量和函数会被存放到**变量环境**中，变量的默认值会被设置为undeﬁned；在代码**执⾏阶段**，JavaScript引擎会从变量环境中去查找⾃定义的变量和函数。<br />如果在编译阶段，存在两个相同的函数，那么最终存放在变量环境中的是最后定义的那个，这是因为后定 义的会覆盖掉之前定义的。<br />以上就是今天所讲的主要内容，当然，学习这些内容并不是让你掌握⼀些JavaScript⼩技巧，其主要⽬的是 让你清楚JavaScript的执⾏机制：**先编译，再执⾏**。<br />如果你了解了JavaScript执⾏流程，那么在编写代码时，你就能避开⼀些陷阱；在分析代码过程中，也能通 过分析JavaScript的执⾏过程来定位问题。
