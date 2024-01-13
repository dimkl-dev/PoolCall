# PoolCall
Это весьма простая обёртка на методом **setTimeout()**. 
Основная задача этого модуля вызвать callback функцию,  не раньше указонного  времени, после последнего вызова метода start(). 


## Зачем 
Допустим вы работаёте с циклом, каждый такт которого занимает определённое количество времени. Количество тактов, и точное время одного такта заранее не известно. Можно только отсдедить начало такта, и примерный временной промежуток. Данный  класс предоставляет API поверх встроенного метода **setTimeout()**. По умолчанию - Javascript позваляет только вызвать функцию или код через указанное время. Также, можно отменить запланированный вазов. 

## Установка
Так пакет **PoolCall** является пакетом nodejs - то вам для установки понадобится менеджер пакетов, к примеру **npm**.

    npm install @dimkl-dev/poolcall


## Использование

    let {PoolCall} = require('dimkl-dev_poolcall"');
    let cb = ()={console.log('i`m called')};
    let wait = new PoolCall(cb);
    wait.start();


## Документация
Документация доступна по ссылке ниже.<br>
<a href="./docs/index.html">PoolCall документация</a>
<!--
./docs/index.html
https://htmlbook.ru/samhtml/yakorya
-->

