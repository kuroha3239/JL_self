let data = [];
// 所有JSON資訊

let zone = [];
// 所有行政區

// 選取各DOM
const zone_title = document.querySelector('.zone_title');
const zone_main = document.querySelector('.zone_main');

const zone_select = document.getElementById('zone_select');
const zone_hot_list = document.querySelector('.hot_zone_list')


// ajax 載入資料
let xhr = new XMLHttpRequest();

// ↓ 檢視 請求狀態成功與否用 ↓
// xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//         console.log('OK')
//     }
// }
xhr.open(
    "GET", "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97", true
);
xhr.send();

xhr.onload = function () {
    let _array = JSON.parse(xhr.responseText);
    console.log('XMLHttpRequest done , _array OK');

    for (let i = 0; i < _array.result.records.length; i++) {
        // push 每一筆 records 到 陣列data 裡
        data.push(_array.result.records[i])
    }
    // console.log(data);

    for (let i = 0; i < data.length; i++) {
        // 再把 data 裡的地區(Zone) 塞到 陣列zone 裡
        zone.push(data[i].Zone)
    }
    console.log(zone);


    // 用filter 排除陣列裡的重複元素
    let _filter_zone = zone.filter(function (item, index, _array) {
        //                       (function (元素內容, 第幾個, 陣列全內容(全部有多少個))

        // console.log('item= ' + item);
        // ↑ item 是 zone , ex:三民區

        // console.log('index= ' + index);
        // ↑ index 是 第幾個位置 , 從0開始算

        // console.log('_array.indexOf(item)= ' + _array.indexOf(item));
        // ↑ _array.indexOf(item) 是回傳該項item元素 在陣列裡的所在位置

        // console.log('---------↑ filter ↑---------');

        return _array.indexOf(item) === index;
        // 找出與 index 相同的目錄，不同的則排除
        // 也就是 把zone各區域(index) 第一次出現的 位置 用index記著
        // 重複出現的就忽略
        // 再把該位置的元素(index) return 回陣列 給 _filter_zone
    });
    // console.log(_filter_zone);

    // 開始組字串，並且加到HTML裡
    const firstSelected = `<option value="">－－請選擇行政區－－</option>`;
    // 首項目 ↑ 由於不會更動，所以用const宣告

    let str = ``
    for (let i = 0; i < _filter_zone.length; i++) {
        str += `
            <option value="${_filter_zone[i]}"> ${_filter_zone[i]} </option>
        `
    }
    zone_select.innerHTML = firstSelected + str;
}

// 當 下拉選單 有變動時，觸發select_changeZone 這個function
zone_select.addEventListener('change', select_changeZone, false);

// console.log(zone_title);
// console.log('↑ 跑 for迴圈之前的 zone_title 為 ↑');

function select_changeZone(e) {

    e.preventDefault();
    let _selected_zone = e.target.value;
    // 把被選到的區域傳給 _selected_zone

    zone_title.textContent = _selected_zone
    // 更新 推薦旅遊區 的標題

    let _recommendZone = [];
    // 推薦旅遊區

    for (let i = 0; i < data.length; i++) {
        if (_selected_zone == data[i].Zone) {
            _recommendZone.push(data[i]);
            // console.log(_recommendZone);
        }
    }

    show_recommendZone();

    function show_recommendZone() {

        let _zone_content = ``;
        // 用來裝各區(zone_card)內容


        for (let i = 0; i < _recommendZone.length; i++) {

            // document.querySelector('.zone_card_top').style.background = '_recommendZone[i].Picture1';

            _zone_content += `
                <div class="zone_card">
                    <div class="zone_card_top" style="background-image:url(${_recommendZone[i].Picture1})">
                        <div class="zone_card_name">${_recommendZone[i].Name}</div>
                        <div class="zone_card_zone">${_recommendZone[i].Zone}</div>
                    </div>
                    <div class="zone_card_bottom">
                        <div class="zone_card_info">
                            <div class="info_img">
                                <img src="assets/icons_clock.png">
                            </div>
                            <p>${_recommendZone[i].Opentime}</p>
                        </div>
                        <div class="zone_card_info">
                            <div class="info_img">
                                <img src="assets/icons_pin.png">
                            </div>
                            <p>${_recommendZone[i].Add}</p>
                        </div>
                        <div class="zone_card_set">
                            <div class="zone_card_info">
                                <div class="info_img">
                                    <img src="assets/icons_phone.png">
                                </div>
                                <p>${_recommendZone[i].Tel}</p>
                            </div>
                            <div class="zone_card_info">
                                <div class="info_img">
                                    <img src="assets/icons_tag.png">
                                </div>
                                <p>${_recommendZone[i].Ticketinfo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
        zone_main.innerHTML = _zone_content
    }
}

//監聽 熱門行政區按鈕 
zone_hot_list.addEventListener('click', click_changeZone, false);

function click_changeZone(e) {

    for (let i = 0; i < data.length; i++) {
        if (e.target.value == data[i].Zone) {

            select_changeZone(e);
            // 條件符合時，再去執行上方的這一支function
        }
    }

}

// gotop
window.onscroll = function () {
    show_goTop_btn();
};

function show_goTop_btn() {
    if (document.documentElement.scrollTop > 550) {
        btn_gotop.style.display = "block";
    } else {
        btn_gotop.style.display = "none";
    }

}
const btn_gotop = document.getElementById('gotop');
// btn_gotop.addEventListener('click', goTop(800), false);
btn_gotop.addEventListener('click', function () {
    goTop(800);
});


function goTop(scrollDuration) {
    // e.preventDefault();
    // document.documentElement.scrollTop = 0;
    let scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function () {
            if (window.scrollY != 0) {
                window.scrollBy(0, scrollStep);
            }
            else clearInterval(scrollInterval);
        }, 15);
}