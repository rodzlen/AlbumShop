        document.addEventListener("DOMContentLoaded", function() {
            // 장바구니에 추가 버튼을 모두 선택합니다.
            const addToCartButtons = document.querySelectorAll(".add-to-cart");

            // 각 버튼에 클릭 이벤트를 추가합니다.
            addToCartButtons.forEach(button => {
                button.addEventListener("click", function() {
                    // 클릭된 버튼의 데이터를 읽어와 장바구니에 추가하는 함수를 호출합니다.
                    const productId = button.getAttribute("data-id");
                    const price = parseFloat(button.getAttribute("data-price"));
                    const productName = button.getAttribute("data-name");
                    addToCart(productId, productName, price);
                });
            });

            // 장바구니에 제품을 추가하는 함수입니다.
            function addToCart(productId, productName, price) {
                // 여기에 제품을 장바구니에 추가하는 코드를 작성합니다.
                // 각 제품의 ID, 이름, 가격을 사용하여 장바구니에 추가합니다.
                // 세션 스토리지에 정보를 저장합니다.
                const cartItem = {
                    id: productId,
                    name: productName,
                    price: price,
                    quantity: 1 // 일단 1개로 설정
                };
                // 장바구니 항목을 세션 스토리지에 추가합니다.
                addToCartSession(cartItem);
                console.log("장바구니에 추가: " + productName + ", 가격: " + price);
            }

            // 세션 스토리지에 장바구니 항목을 추가하는 함수입니다.
            function addToCartSession(item) {
                // 현재 장바구니 목록을 가져옵니다.
                let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
                // 장바구니에 같은 제품이 이미 있는지 확인합니다.
                const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
                if (existingItemIndex !== -1) {
                    // 이미 장바구니에 있는 제품이면 수량을 증가시킵니다.
                    cart[existingItemIndex].quantity++;
                } else {
                    // 장바구니에 없는 제품이면 새로 추가합니다.
                    cart.push(item);
                }
                // 업데이트된 장바구니 목록을 세션 스토리지에 저장합니다.
                sessionStorage.setItem("cart", JSON.stringify(cart));
            }

            // 로그인 버튼과 프로필 버튼, 로그아웃 버튼을 선택합니다.
            const loginBtn = document.querySelector(".login-btn");
            const profileBtn = document.querySelector(".profile-btn");
            const logoutBtn = document.querySelector(".logout-btn");

            // 로그인 상태를 확인하는 함수입니다.
            function isLoggedIn() {
                return sessionStorage.getItem("isLoggedIn") === "true";
            }

            // 페이지 로드 시 버튼 상태를 업데이트합니다.
            function updateButtonVisibility() {
                if (isLoggedIn()) {
                    profileBtn.style.display = "inline-block";
                    logoutBtn.style.display = "inline-block"; // 로그인되면 로그아웃 버튼 표시
                    loginBtn.style.display = "none";
                } else {
                    profileBtn.style.display = "none";
                    logoutBtn.style.display = "none"; // 로그아웃 상태에서는 로그아웃 버튼 감춤
                    loginBtn.style.display = "inline-block";
                }
            }
            

            // 페이지 로드 시 버튼 상태를 업데이트합니다.
            updateButtonVisibility();
        });
        document.addEventListener("DOMContentLoaded", function() {
            // 로그아웃 버튼을 선택합니다.
            const logoutBtn = document.querySelector(".logout-btn");

            // 로그아웃 버튼에 클릭 이벤트를 추가합니다.
            logoutBtn.addEventListener("click", function(event) {
                event.preventDefault(); // 링크의 기본 동작인 페이지 이동을 막습니다.
                logout(); // 로그아웃 함수를 호출합니다.
            });

            // 로그아웃 함수입니다.
            function logout() {
                // 세션 스토리지에서 로그인 상태를 false로 변경합니다.
                sessionStorage.setItem("isLoggedIn", "false");
                // 로그인 버튼과 프로필 버튼, 로그아웃 버튼의 표시 상태를 업데이트합니다.
                window.location.reload();
            }

            // 기존의 코드를 포함하여 로그인 상태를 확인하는 함수와 버튼 상태를 업데이트하는 함수는 그대로 사용합니다.
            // ...

            // 페이지 로드 시 버튼 상태를 업데이트합니다.
            updateButtonVisibility();
        });