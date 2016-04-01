import $ from 'jquery';


// newsのAPIを叩くサンプル
$.ajax('/api/news.json')
    .done((json) => {
        console.log(json);
    })
    .fail((err) => {
        alert("ニュースの読み込みに失敗しました！");
    });


// memberのAPIを叩くサンプル
const page = 1;
$.ajax(`/api/member.${page}.json`)
    .done((json) => {
        console.log(json);
    })
    .fail((err) => {
        alert("メンバーの読み込みに失敗しました！");
    });
