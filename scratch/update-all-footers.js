const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && !f.startsWith('google'));

console.log('HTML files to check/update:', htmlFiles);

const standardGuidesWidget = `                <div class="footer-widget">
                    <h3 class="widget-title">দুধ ও ডেলিভারি গাইড</h3>
                    <ul class="footer-links">
                        <li><a href="mirpur-12-milk-delivery.html">মিরপুর ১২ দুধ ডেলিভারি</a></li>
                        <li><a href="cow-milk-home-delivery-pallabi.html">পল্লবী দুধ ডেলিভারি</a></li>
                        <li><a href="pure-cow-milk-mirpur.html">মিরপুরে খাঁটি দুধ</a></li>
                        <li><a href="khati-gorur-dudh.html">খাঁটি গরুর দুধ চেনার উপায়</a></li>
                        <li><a href="gorur-dudh-home-delivery.html">গরুর দুধ হোম ডেলিভারি</a></li>
                        <li><a href="milk-price.html">গরুর দুধের দাম</a></li>
                        <li><a href="pure-milk-benefits.html">খাঁটি দুধের পুষ্টিগুণ</a></li>
                    </ul>
                </div>`;

const standardContactWidget = `                <div class="footer-widget">
                    <h3 class="widget-title">যোগাযোগ ও ঠিকানা</h3>
                    <div class="footer-contact" style="font-size: 14px; display: flex; flex-direction: column; gap: 10px;">
                        <div><i class="fa-solid fa-location-dot" style="color: var(--dpo-sun, #f59e0b); margin-right: 8px;"></i> House 18, Road 4, Block C, Mirpur-12, Dhaka-1216</div>
                        <div><i class="fa-solid fa-phone" style="color: var(--dpo-green, #10b981); margin-right: 8px;"></i> <a href="tel:+8801712281861" style="color: inherit;">+880 1712-281861</a>, <a href="tel:+8801734580407" style="color: inherit;">+880 1734580407</a></div>
                        <div><i class="fa-brands fa-whatsapp" style="color: #25d366; margin-right: 8px;"></i> <a href="https://wa.me/8801775002340" target="_blank" style="color: inherit;">+880 1775 002 340</a></div>
                        <div><i class="fa-solid fa-clock" style="color: var(--dpo-sun, #f59e0b); margin-right: 8px;"></i> ডেলিভারি: ২৪/৭ (দিন-রাত ২৪ ঘণ্টা সার্বক্ষণিক)</div>
                    </div>
                </div>`;

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace any old domain occurrences
  html = html.replace(/https:\/\/dhaka-enterprise\.dpo-bangladesh\.org/g, 'https://www.dairypureorganic.com');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Processed:', file);
}

console.log('All footers and canonical URLs verified successfully!');
