    window.addEventListener("resize", resizeCanvas, false);
        window.addEventListener("DOMContentLoaded", onLoad, false);
        
        window.requestAnimationFrame = 
            window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function (callback) {
                window.setTimeout(callback, 1000/60);
            };
        
        var canvas, ctx, w, h, particles = [], probability = 0.04,
            xPoint, yPoint;
        
        
        function onLoad() {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            resizeCanvas();
            
            window.requestAnimationFrame(updateWorld);
        } 
        
        function resizeCanvas() {
            if (!!canvas) {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            }
        } 
        
        function updateWorld() {
            update();
            paint();
            window.requestAnimationFrame(updateWorld);
        } 
        
        function update() {
            if (particles.length < 500 && Math.random() < probability) {
                createFirework();
            }
            var alive = [];
            for (var i=0; i<particles.length; i++) {
                if (particles[i].move()) {
                    alive.push(particles[i]);
                }
            }
            particles = alive;
        } 
        
  function paint() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = "rgba(0,0,0,0.2)";
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = 'lighter';
            for (var i=0; i<particles.length; i++) {
                particles[i].draw(ctx);
            }
        } 
        
        function createFirework() {
            xPoint = Math.random()*(w-200)+100;
            yPoint = Math.random()*(h-200)+100;
            var nFire = Math.random()*50+100;
            var c = "rgb("+(~~(Math.random()*200+55))+","
                 +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
            for (var i=0; i<nFire; i++) {
                var particle = new Particle();
                particle.color = c;
                var vy = Math.sqrt(25-particle.vx*particle.vx);
                if (Math.abs(particle.vy) > vy) {
                    particle.vy = particle.vy>0 ? vy: -vy;
                }
                particles.push(particle);
            }
        } 
        
        function Particle() {
            this.w = this.h = Math.random()*4+1;
            
            this.x = xPoint-this.w/2;
            this.y = yPoint-this.h/2;
            
            this.vx = (Math.random()-0.5)*10;
            this.vy = (Math.random()-0.5)*10;
            
            this.alpha = Math.random()*.5+.5;
            
            this.color;
        } 
        
        Particle.prototype = {
            gravity: 0.05,
            move: function () {
                this.x += this.vx;
                this.vy += this.gravity;
                this.y += this.vy;
                this.alpha -= 0.01;
                if (this.x <= -this.w || this.x >= screen.width ||
                    this.y >= screen.height ||
                    this.alpha <= 0) {
                        return false;
                }
                return true;
            },
            draw: function (c) {
                c.save();
                c.beginPath();
                
                c.translate(this.x+this.w/2, this.y+this.h/2);
                c.arc(0, 0, this.w, 0, Math.PI*2);
                c.fillStyle = this.color;
                c.globalAlpha = this.alpha;
                
                c.closePath();
                c.fill();
                c.restore();
            }
        } 
        
        

    // js functions here
    document.getElementById('scrollToFormBtn').addEventListener('click', () => {
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    });


function isNumber(event) {
    const char = event.which || event.keyCode;
    if (char < 48 || char > 57) {
        event.preventDefault();
        return false;
    }
    return true;
}
//  only for Name field
const nameInput = document.getElementById("name");

if (nameInput) {
    nameInput.addEventListener("keypress", function (event) {
        if (!/^[a-zA-Z\s]$/.test(event.key)) {
            event.preventDefault();
        }
    });
}


function calculateTotal(input) {
    const row = input.closest(".calculate-amount");

    const priceText = row.querySelector(".price")?.innerText || "0";
    const actualPriceText = row.querySelector(".actual-price")?.innerText || "0";

    const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
    console.log("price:", price);
    const actualPrice = parseFloat(actualPriceText.replace(/[^\d.]/g, '')) || 0;
    const qty = parseInt(input.value) || 0;

    const totalField = row.querySelector(".total");

    if (!isNaN(price) && !isNaN(qty)) {
        const total = price * qty;
         totalField.value = total.toFixed(2); 
        console.log("total:", totalField.value);
    } else {
        totalField.value = "";
    }

    updateSummary();
}

function updateSummary()
     {
        let total = 0;
        let saved = 0;
        let grandAmound = 0;

        const rows = document.querySelectorAll(".calculate-amount");

        rows.forEach(row => {
            const qty = parseInt(row.querySelector(".qty")?.value) || 0;
            const price = parseFloat((row.querySelector(".price")?.innerText || "0").replace(/[^\d.]/g, '')) || 0;
            const actualPrice = parseFloat((row.querySelector(".actual-price")?.innerText || "0").replace(/[^\d.]/g, '')) || 0;

            grandAmound += actualPrice * qty;
            total += price * qty;
            saved += (actualPrice - price) * qty;
            // finalTotal = (grandAmound - saved) + 30;
        });
        let finalTotal = total + 30;

        document.getElementById("grandAmount").innerText = `Rs. ${grandAmound}`;
        document.getElementById("savedAmount").innerText = `Rs. ${saved}`;
        document.getElementById("total").innerText = `Rs. ${finalTotal}`;

        document.getElementById("number").value = total;
    }


    window.addEventListener("load", () => {
    document.querySelectorAll(".qty, .total").forEach(input => {
        input.value = "";
    });

        document.getElementById("grandAmount").innerText = "Rs. 0.00";
        document.getElementById("savedAmount").innerText = "Rs. 0.00";
        document.getElementById("total").innerText = "Rs. 0.00";
    });

function handleSubmit(event)
{
    event.preventDefault();

    let valid = true;

    // Validation logic
    const name = document.getElementById('name').value;
    if (name.trim() === '' || !/^[a-zA-Z ]+$/.test(name)) {
        document.getElementById('nameError').textContent = 'This field is required.';
        valid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    const address = document.getElementById('address').value;
    if (address.trim() === '') {
        document.getElementById('addressError').textContent = 'This field is required.';
        valid = false;
    } else {
        document.getElementById('addressError').textContent = '';
    }

    const phone_1 = document.getElementById('number1').value;
    if (phone_1.trim() === '') {
        document.getElementById('number1Error').textContent = 'This field is required.';
        valid = false;
    } else {
        document.getElementById('number1Error').textContent = '';
    }

    const phone_2 = document.getElementById('number2').value;
    if (phone_2.trim() === '') {
        document.getElementById('number2Error').textContent = 'This field is required.';
        valid = false;
    } else {
        document.getElementById('number2Error').textContent = '';
    }


    const email = document.getElementById('email').value;
    if (email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'This field is required.';
        valid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    const person = document.getElementById('person-name').value;
    if (person.trim() === '' || person === 'Select name') {
        document.getElementById('personError').textContent = 'Please select a name.';
        valid = false;
    } else {
        document.getElementById('personError').textContent = '';
    }

    const city = document.getElementById('city').value;
    if(city.trim() === ''){
        document.getElementById('cityError').textContent = 'This field is required.';
        valid = false;
    }else{
        document.getElementById('cityError').textContent = '';
    }

    // If valid, show modal and reset form
    if (valid) 
    {
        const totalAmount = parseInt(document.getElementById('number').value) || 0;
        if(totalAmount < 3000){
            const modal = new bootstrap.Modal(document.getElementById('warningModal'));
            modal.show();
        } else {
            const city = document.getElementById('city').value; // ✅ value
            console.log("city:", city);
            const person = document.getElementById('person-name').value;
            console.log("person:" , person); 

            const phone1 = document.getElementById('number1').value; // ✅ value
            console.log("number1:", phone1);

            const phone2 = document.getElementById('number2').value; // ✅ value
            console.log("number2:", phone2);

            const items = [];
            document.querySelectorAll(".calculate-amount").forEach(row => {
                const itemName = row.querySelector(".item-name")?.innerText.trim() || '';
                const qty = parseInt(row.querySelector("input.qty")?.value) || 0;
                const priceText = row.querySelector(".price")?.innerText || "0";
                const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
                const total = price * qty;
                 console.log("Product:", itemName, "Qty:", qty, "Price:", price);

                if (qty > 0) {
                    items.push({ name: itemName, qty, price, total });
                }
            });
            const invoiceData = {
                name: name,
                address: address,
                email: email,
                city: city,
                person: person,
                phone1: phone1,
                phone2: phone2, 
                items
            };
                console.log("Final items array:", items);
            localStorage.setItem("invoiceData", JSON.stringify(invoiceData));

            const successModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
            successModal.show();


            const form = document.getElementById('registrationForm');
            form.reset();
            document.querySelectorAll(".qty, .total").forEach(input => {
                input.value = "";
            });

            document.getElementById("grandAmount").innerText = "Rs. 0.00";
            document.getElementById("savedAmount").innerText = "Rs. 0.00";
            document.getElementById("total").innerText = "Rs. 0.00";
            document.getElementById("number").value = 0;

        }

    }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("successModalOkBtn").addEventListener("click", () => {
    const savedData = JSON.parse(localStorage.getItem("invoiceData")) || {};

    // 0️⃣ Initialize EmailJS
(function(){
    emailjs.init("grElZry7FiYT2sgym"); // Replace with your real public key
})();
    // 🔹 EmailJS template params
const templateParams = {
    cus_name: savedData.name,
    cus_per_name: savedData.person,
    cus_address: savedData.address, // 🔹 This is for address
    cus_email: savedData.email,
    cus_city: savedData.city,
    cus_phone1: savedData.phone1,
    cus_phone2: savedData.phone2,
    order_table: savedData.items.map((item, i) =>
        `${i + 1}. ${item.name} - Qty: ${item.qty}, Price: Rs. ${item.price}, Total: Rs. ${item.total}`
    ).join("\n"),
    // total_amount: savedData.items.reduce((sum, item) => sum + item.total, 0)
    total_amount: savedData.items.reduce((sum, item) => sum + item.total, 0) + 30

};
// 1️⃣ Send email first
emailjs.send('service_l0fgw2j', 'template_zspyfiv', templateParams)
    .then(function(response) {
        console.log('✅ Email sent!', response.status, response.text);
    }, function(error) {
        console.error('❌ Email failed...', error);
    });



    // 🔹 pdf template params
    fillInvoice(savedData);
    const invoiceContainer = document.getElementById('invoice-container');
    invoiceContainer.style.display = 'block';
    setTimeout(() => {
      html2pdf().from(invoiceContainer).set({
        margin: 10,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).save().then(() => invoiceContainer.style.display = 'none');
    }, 500);
  });
});


function fillInvoice(data) {

    console.log("Invoice Data Received:", data);
    document.getElementById("invoice-date").textContent = new Date().toLocaleDateString('en-GB');

    let lastNo = localStorage.getItem("lastInvoiceNo") || "TN0000";
    let numberPart = parseInt(lastNo.substring(2)) + 1;
    let newInvoiceNo = "TN" + numberPart.toString().padStart(4, '0');
    localStorage.setItem("lastInvoiceNo", newInvoiceNo);
    document.getElementById("invoice-no").textContent = newInvoiceNo;

    document.getElementById("cus-name").textContent = data.name || '';
    document.getElementById("cus-address").textContent = data.address || '';
    document.getElementById("cus-email").textContent = data.email || '';
    document.getElementById("cus-city").textContent = data.city || '';
    document.getElementById("cus-per-name").textContent = data.person || '';
    document.getElementById("cus-phone1").textContent = data.phone1 || '';
    document.getElementById("cus-phone2").textContent = data.phone2 || '';

    let rows = "";
    let grandTotal = 0;
    let grandQty = 0;
    (data.items || []).forEach((item, i) => {
        rows += `<tr>
            <td>${i + 1}</td>
            <td>${item.name}</td>
            <td>Rs ${item.price}</td>
            <td>${item.qty}</td>
            <td>Rs ${item.total}</td>
        </tr>`;
        grandTotal += item.total;
        grandQty += item.qty;
    });
    document.getElementById("itemsTable").innerHTML = rows;
    // document.getElementById("total-amount").textContent = `Rs. ${grandTotal}`;
    document.getElementById("total-amount").textContent = `Rs. ${grandTotal + 30}`;

    document.getElementById("total-qty").textContent = grandQty;
}


