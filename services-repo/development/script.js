const frame_btn = document.querySelectorAll(".frame-btn");
const frame_section = document.querySelectorAll(".framework-section");

frame_btn.forEach((button) => {
    button.addEventListener("click", () => {
        const target = button.dataset.target;

        frame_section.forEach((section) => {
            section.classList.remove("active");
        });

        frame_btn.forEach((btn) => {
            btn.classList.remove("active");
        });

        document.getElementById(target).classList.add("active");
        button.classList.add("active");
    });
});