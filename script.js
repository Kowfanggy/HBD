
/* =========================================
   HAPPY BIRTHDAY P'AOMSIN ♡
   JavaScript สำหรับเว็บไซต์วันเกิด
========================================= */

/* 1. ตั้งค่าข้อมูลเว็บไซต์ */

const CONFIG = {
  sisterName: "ปี้ออมสิน",

  birthdayMessage:
    "HapHap เน้อจ้าวปี้ออมสินนนน น้องขอหื้อปี้มีความสุขในทุกๆวัน นอนหลับฝันดีในทุกๆคืน คิดสิ่งไหนขอหื้อสมปรารถนา รวยๆเฮงๆ สวยวันสวยคืน ไม่เจ็บไม่ป่วย บ่ปวดหลังเน้อ 5555 ฮักปี้เน้อ♡",

  signature:
    "ฮักปี้เสมอ — จากน้องข้าวฟ่างตี้ตั้งจัยทำเว็บนี้หื้อเน้อจ้าว ♡♡",

  // ชื่อไฟล์เพลงในโฟลเดอร์ audio
  musicFile: "audio/birthday-song.mp4",

  photos: [
    {
      src: "images/photo1.jpg",
      caption: "ภาพที่เต็มไปด้วยความน่ารัก"
    },
    {
      src: "images/photo2.jpg",
      caption: "รอยยิ้มที่โคตรจะสดใส"
    },
    {
      src: "images/photo3.jpg",
      caption: "ภาพที่ดูกี่ครั้งก็หลงใหล"
    }
  ]
};


/* 2. ฟังก์ชันค้นหาองค์ประกอบ HTML */

const $ = (selector) => document.querySelector(selector);


/* 3. เตรียมตัวแปรสำหรับเว็บไซต์ */

const music = $("#birthdayMusic");
const musicButton = $("#musicButton");
const nav = $("#nav");


/* 4. ใส่ข้อความอวยพร */

if ($("#letterText")) {
  $("#letterText").textContent = CONFIG.birthdayMessage;
}

if ($(".signature")) {
  $(".signature").textContent = CONFIG.signature;
}


/* =========================================
   5. ระบบเพลงวันเกิด
========================================= */

if (music && musicButton) {
  music.src = CONFIG.musicFile;
  music.loop = true;
  music.load();

  musicButton.addEventListener("click", async () => {
    try {
      if (music.paused) {
        await music.play();

        musicButton.classList.add("active");
        musicButton.setAttribute("aria-pressed", "true");

        if ($("#musicLabel")) {
          $("#musicLabel").textContent = "ปิดเพลง";
        }
      } else {
        music.pause();

        musicButton.classList.remove("active");
        musicButton.setAttribute("aria-pressed", "false");

        if ($("#musicLabel")) {
          $("#musicLabel").textContent = "เปิดเพลง";
        }
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเล่นเพลง:", error);

      showToast(
        "เปิดเพลงไม่ได้ ตรวจสอบชื่อไฟล์และโฟลเดอร์ audio นะคะ 🎵"
      );
    }
  });

  music.addEventListener("error", () => {
    console.error(
      "ไม่สามารถโหลดไฟล์เพลงได้:",
      music.currentSrc,
      music.error
    );
  });
}


/* =========================================
   6. กล่องของขวัญเซอร์ไพรส์
========================================= */

const presentButton = $("#presentButton");
const revealCard = $("#revealCard");

if (presentButton && revealCard) {
  presentButton.addEventListener("click", () => {
    const isOpen = presentButton.classList.toggle("open");

    revealCard.hidden = !isOpen;

    if ($("#presentHint")) {
      $("#presentHint").textContent = isOpen
        ? "เซอร์ไพรส์! ส่งความรักหื้อปี้ออมสิน ♡"
        : "แตะกล่องเพื่อเปิดเซอร์ไพรส์ ♡";
    }

    if (isOpen) {
      launchConfetti(55);
      showToast("Happy Birthday ปี้ออมสิน 💗");
    }
  });
}


/* =========================================
   7. แกลเลอรีรูปภาพ
========================================= */

const photoCards = document.querySelectorAll(".photo-card");

photoCards.forEach((card, index) => {
  const photo = CONFIG.photos[index];

  if (!photo) return;

  const img = card.querySelector("img");
  const placeholder = card.querySelector(".placeholder");
  const caption = card.querySelector(".caption");

  if (caption) {
    caption.textContent = photo.caption;
  }

  if (img) {
    img.onload = () => {
      img.classList.add("loaded");

      if (placeholder) {
        placeholder.classList.add("hidden");
      }
    };

    img.onerror = () => {
      img.classList.remove("loaded");

      if (placeholder) {
        placeholder.classList.remove("hidden");
      }

      console.warn("ไม่พบรูปภาพ:", photo.src);
    };

    img.src = photo.src;
  }

  card.addEventListener("click", () => {
    if (!img || !img.classList.contains("loaded")) {
      showToast("ตรวจสอบรูปภาพในโฟลเดอร์ images ก่อนนะคะ 📸");
      return;
    }

    if ($("#largePhoto")) {
      $("#largePhoto").src = photo.src;
    }

    if ($("#photoCaption")) {
      $("#photoCaption").textContent = photo.caption;
    }

    if ($("#lightbox")) {
      $("#lightbox").hidden = false;
    }
  });
});


/* =========================================
   8. เปิดและปิดภาพขนาดใหญ่
========================================= */

if ($("#closeLightbox")) {
  $("#closeLightbox").addEventListener("click", () => {
    if ($("#lightbox")) {
      $("#lightbox").hidden = true;
    }
  });
}

if ($("#lightbox")) {
  $("#lightbox").addEventListener("click", (event) => {
    if (event.target.id === "lightbox") {
      $("#lightbox").hidden = true;
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && $("#lightbox")) {
    $("#lightbox").hidden = true;
  }
});


/* =========================================
   9. ปุ่มแก้ไขคำอวยพร (ถ้ามีใน HTML)
========================================= */

if ($("#editLetter")) {
  $("#editLetter").addEventListener("click", () => {
    const letter = $("#letterText");

    const newMessage = prompt(
      "พิมพ์คำอวยพรใหม่ได้เลยค่ะ",
      letter ? letter.textContent : CONFIG.birthdayMessage
    );

    if (newMessage && newMessage.trim() && letter) {
      letter.textContent = newMessage.trim();
      showToast("อัปเดตคำอวยพรแล้ว ♡");
    }
  });
}


/* =========================================
   10. ปุ่มเป่าเทียนวันเกิด
========================================= */

if ($("#blowButton")) {
  $("#blowButton").addEventListener("click", () => {
    const flame = $("#candleFlame");

    if (flame) {
      flame.style.opacity = "0";
      flame.style.transform = "scale(0.1)";
    }

    if ($("#wishResult")) {
      $("#wishResult").textContent =
        "ขอหื้อคำอธิษฐานของปี้ออมสินเป็นจริงทุกข้อเลยเน้อจ้าว ✨";
    }

    launchConfetti(60);
    showToast("สุขสันต์วันเกิดจ้าว 🎂");

    if (flame) {
      setTimeout(() => {
        flame.style.opacity = "1";
        flame.style.transform = "";
      }, 3200);
    }
  });
}


/* =========================================
   11. เมนูเว็บไซต์บนมือถือ
========================================= */

if ($("#menuToggle") && nav) {
  $("#menuToggle").addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

if (nav) {
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}


/* =========================================
   12. เอฟเฟกต์หัวใจ ดาว และดอกไม้โปรย
========================================= */

function launchConfetti(count = 40) {
  const symbols = ["♡", "✦", "✧", "♥", "✿", "★"];

  const colors = [
    "#f3a9bd",
    "#f8c5ad",
    "#ffe58a",
    "#b9d9b7",
    "#9ddff0"
  ];

  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");

    item.className = "confetti";

    item.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    item.style.left = `${Math.random() * 100}vw`;

    item.style.color =
      colors[Math.floor(Math.random() * colors.length)];

    item.style.fontSize =
      `${12 + Math.random() * 20}px`;

    item.style.animationDuration =
      `${1.8 + Math.random() * 2}s`;

    item.style.animationDelay =
      `${Math.random() * 0.5}s`;

    document.body.appendChild(item);

    setTimeout(() => {
      item.remove();
    }, 4500);
  }
}


/* =========================================
   13. ข้อความแจ้งเตือน
========================================= */

let toastTimer;

function showToast(message) {
  const toast = $("#toast");

  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}


/* =========================================
   14. ตรวจสอบการโหลดเว็บไซต์
========================================= */

console.log("เว็บไซต์วันเกิดปี้ออมสินพร้อมใช้งาน ♡");
console.log("ตำแหน่งไฟล์เพลง:", CONFIG.musicFile);
