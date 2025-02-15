document.getElementById("depreciationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // وەرگرتنی داتا لە فۆڕمەکە
    const initialValue = parseFloat(document.getElementById("initialValue").value);
    const salvageValue = parseFloat(document.getElementById("salvageValue").value);
    const usefulLife = parseInt(document.getElementById("usefulLife").value);

    // پاککردنەوەی خشتەی پێشوو
    const tableBody = document.querySelector("#resultTable tbody");
    tableBody.innerHTML = "";

    // کۆی ژمارەی ساڵانە
    const sumOfYears = (usefulLife * (usefulLife + 1)) / 2;

    // دروستکردنی خشتەی ئەنجامەکان
    let accumulatedDepreciation = 0;
    let bookValue = initialValue;

    for (let year = 1; year <= usefulLife; year++) {
        const remainingLife = usefulLife - year + 1;
        const depreciationRate = remainingLife / sumOfYears;
        const depreciationExpense = depreciationRate * (initialValue - salvageValue);
        accumulatedDepreciation += depreciationExpense;
        const endingBookValue = bookValue - depreciationExpense;

        // زیادکردنی ڕیزەکە بۆ خشتەکە
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${year}</td>
            <td>${bookValue.toFixed(2)}</td>
            <td>${depreciationRate.toFixed(2)}</td>
            <td>${depreciationExpense.toFixed(2)}</td>
            <td>${accumulatedDepreciation.toFixed(2)}</td>
            <td>${endingBookValue.toFixed(2)}</td>
        `;

        // زیادکردنی ڕیزەکە بۆ خشتەکە
        tableBody.appendChild(row);

        // نوێکردنەوەی کلفەی مەوجود بۆ ساڵی داهاتوو
        bookValue = endingBookValue;
    }

    // پیشاندانی بەشی ئەنجامەکان
    document.getElementById("resultSection").classList.remove("hidden");

    // زیادکردنی ڕوونکردنەوە بۆ هەر خانەیەک
    const cells = document.querySelectorAll("#resultTable tbody td");
    const tooltip = document.getElementById("tooltip");

    cells.forEach(cell => {
        cell.addEventListener("mouseover", function (event) {
            const columnIndex = cell.cellIndex;
            const rowIndex = cell.parentElement.rowIndex;
            const row = cell.parentElement;

            let explanation = "";
            switch (columnIndex) {
                case 0: // ساڵ
                    explanation = `ساڵی ${cell.textContent}یە.`;
                    break;
                case 1: // کلفەی مەوجود
                    explanation = `کلفەی مەوجود لە سەرەتای ساڵی ${row.cells[0].textContent}یە.`;
                    break;
                case 2: // محامل ئیندثار
                    explanation = ` لە محامل ئەو یاسایەمان هەیە کە دەڵیت کۆی ژمارەی سالەکان یانی ١+٢+٣+٤+٥ دەکاتە ١٥ ئێ یانی ٥ ساڵێشت هەیە دەبتە ١ لەسەر ١٥ ٢لسەر ١٥ هەتا ئاخیری دە تێبگە بەس ئاگاداربە نمونە ٥ ساڵت هەیە لە ٥ لەسەر ١٥ پێدا وەرە لە خانەی دووەم ٤ لەسەر ١٥ ئەوها ).`;
                    break;
                case 3: // قستی ئیندثاری سنوی
                    explanation = `قستی ئیندثاری سنوی کاکە ئەوەیە یاساکە بەس لەبەرکە (محامل ئیندثار × (کلفەی ئالەتکە - قیمە خوردە)).`;
                    break;
                case 4: // مخصص ئیندثار
                    explanation = `مخصص ئیندثار کۆی قستی ئیندثاری سنویە یانی قیستی ئیندثاری سەنەوی لە یەکەم دابنێ دوای خانە خانە لەگەڵ قیستی ئیندثارەکە کۆ بکەوە لە خانەی دوەم دانێ ئەوجە ئەوها سەبر سەبر کۆی بکەوە هەتا ساڵی کۆتای .`;
                    break;
                case 5: // کلفەی تەواو
                    explanation = `قیمە دەفتەریە ئەوهایە جوان تەماشا بکە پێم ناکرێ بیم لە ئیمتحان بەتوو برێم (کلفەی مەوجود - قستی ئیندثاری سنوی).`;
                    break;
                default:
                    explanation = "";
            }

            // نیشاندانی تووڵتیپ
            tooltip.textContent = explanation;
            tooltip.classList.remove("hidden");
            tooltip.classList.add("visible");

            // شوێنی تووڵتیپ
            const rect = cell.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY}px`;
        });

        cell.addEventListener("mouseout", function () {
            tooltip.classList.remove("visible");
            tooltip.classList.add("hidden");
        });
    });
});