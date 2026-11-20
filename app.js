const WA="2349132878910", UNIT=30000, WHOLESALE=26000;let qty=0;
const $=id=>document.getElementById(id);
function price(){return qty>=10?WHOLESALE:UNIT}
function money(n){return "₦"+n.toLocaleString("en-NG")}
function update(){ $("cartCount").textContent=qty;$("cartItems").innerHTML=qty?`<div class="cartline"><div><b>DE YANKEES 40000mAh Power Bank</b><br><small>${money(price())} each</small></div><div class="qty"><button id="minus">−</button> ${qty} <button id="plus">+</button></div></div>`:"<p>Your cart is empty.</p>";$("total").textContent=money(qty*price());if($("minus"))$("minus").onclick=()=>{qty=Math.max(0,qty-1);update()};if($("plus"))$("plus").onclick=()=>{qty++;update()}}
function drawer(open){$("drawer").classList.toggle("open",open);$("overlay").classList.toggle("open",open)}
$("addCart").onclick=()=>{qty++;update();drawer(true)};$("cartOpen").onclick=()=>drawer(true);$("cartClose").onclick=()=>drawer(false);$("overlay").onclick=()=>drawer(false);
$("checkout").onclick=()=>{if(!qty){alert("Your cart is empty.");return}drawer(false);$("checkoutModal").classList.add("open")};
$("modalClose").onclick=()=>$("checkoutModal").classList.remove("open");
$("orderForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);const total=qty*price();const msg=`Hello DE YANKEES EMPIRE GADGET, I want to place an order.%0AProduct: DE YANKEES 40000mAh Power Bank%0AQuantity: ${qty}%0APrice per unit: ${money(price())}%0ATotal: ${money(total)}%0AName: ${encodeURIComponent(f.get("name"))}%0APhone: ${encodeURIComponent(f.get("phone"))}%0ADelivery address: ${encodeURIComponent(f.get("address"))}%0APayment preference: ${encodeURIComponent(f.get("payment"))}%0APlease confirm availability, delivery fee and payment instructions.`;window.open(`https://wa.me/${WA}?text=${msg}`,"_blank");};
$("year").textContent=new Date().getFullYear();
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
update();