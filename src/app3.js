import $ from 'jquery'
import './app3.css'

const html = `
<section id="app3">
            <div class="square"></div>
        </section>
`
const $element = $(html).appendTo($('body>.page'));


const $square = $('#app3 .square');
const localKey = 'app3.active';
const active = localStorage.getItem(localKey) === 'yes';

// if (active) {
//     $square.addClass('active');
// } else {
//     $square.removeClass('active');
// }
$square.toggleClass('active', active) //会根据第二个参数的真假来决定加不加

$square.on('click', () => {
    if ($square.hasClass('active')) {
        $square.removeClass('active');
        localStorage.setItem(localKey, 'no');
    } else {
        $square.addClass('active');
        localStorage.setItem(localKey, 'yes');
    }
})