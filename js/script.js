/* ==================================================
   منصة الفاحص برو - مكتب القرية للاستشارات الهندسية والمساحية
   JavaScript الرئيسي للتفاعلات والنموذج
   ================================================== */

document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Mobile Menu Toggle (فتح وإغلاق قائمة الهاتف)
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        // إغلاق القائمة عند الضغط على أي رابط داخلها
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. FAQ Accordion (الأسئلة الشائعة - فتح وإغلاق سؤال واحد في كل مرة)
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function (questionBtn) {
        questionBtn.addEventListener('click', function () {
            const parentItem = this.parentElement;
            const isAlreadyActive = parentItem.classList.contains('active');

            // إغلاق جميع الأسئلة الأخرى أولاً
            document.querySelectorAll('.faq-item').forEach(function (item) {
                item.classList.remove('active');
                const btn = item.querySelector('.faq-question');
                if (btn) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            });

            // إذا لم يكن التبويب مفتوحاً مسبقاً، نقم بفتحه
            if (!isAlreadyActive) {
                parentItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // 3. Scroll to Top Button (زر العودة إلى الأعلى)
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Contact Form Handler (التحقق من النموذج وتوجيهه إلى واتساب مباشرة)
    const inspectionForm = document.getElementById('inspectionForm');

    if (inspectionForm) {
        inspectionForm.addEventListener('submit', function (e) {
            e.preventDefault(); // منع إعادة تحميل الصفحة

            // استلام قيم المدخلات وتظهيرها
            const nameInput = document.getElementById('userName');
            const phoneInput = document.getElementById('userPhone');
            const serviceInput = document.getElementById('serviceType');
            const messageInput = document.getElementById('userMessage');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const service = serviceInput ? serviceInput.value.trim() : '';
            const userMsg = messageInput ? messageInput.value.trim() : '';

            // التحقق من الحقول الإجبارية
            if (!name || !phone || !service) {
                alert('يرجى تعبئة جميع الحقول المطلوبة (الاسم، رقم الهاتف، ونوع الخدمة).');
                return;
            }

            // تجهيز نص الرسالة للواتساب بشكل منظم ورسمي
            const whatsappNumber = '966502293524';
            let formattedMessage = 'السلام عليكم ورحمة الله وبركاته،\n' +
                'طلب جديد من موقع منصة الفاحص برو:\n\n' +
                '📌 الاسم: ' + name + '\n' +
                '📱 رقم الهاتف: ' + phone + '\n' +
                '🛠️ الخدمة المطلوبة: ' + service;

            if (userMsg !== '') {
                formattedMessage += '\n📝 تفاصيل إضافية: ' + userMsg;
            }

            // ترميز النص ليكون رابطاً صالحاً للواتساب
            const encodedMessage = encodeURIComponent(formattedMessage);
            const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodedMessage;

            // فتح رابط الواتساب في نافذة جديدة
            try {
                window.open(whatsappUrl, '_blank');
            } catch (error) {
                alert('تعذر فتح الواتساب تلقائياً. يمكنك التواصل مباشرة عبر الرقم: 0502293524');
            }
        });
    }
});
