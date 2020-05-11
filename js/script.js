class Main {
  constructor() {
    this.current_page = 1;
    this.rows = 6;
    
    this.data = [];
    this.rooms = [];
    this.apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72"

    this.cardsContainer = document.querySelector("#cards");
    this.pagination_element = document.getElementById('pagination');

    this.init();
  }

  async init() {
    this.data = await this.api();

    if (this.data) {
      this.displayList(this.data, this.rows, this.current_page);
      this.renderCards(this.rooms);
      this.setupPagination(this.data, this.pagination_element, this.rows);
    }
  }

  async api() {
    const response = await fetch(this.apiUrl);
    return response.json();
  }

  displayList(items, rows_per_page, page) {
    const start = rows_per_page * (page - 1);
    const end = start + rows_per_page;

    this.rooms = items.slice(start, end);
  };

  setupPagination(items, pagenumbers, rows_per_page) {
    let page_count = Math.ceil(items.length / rows_per_page);
    for (let i = 1; i < page_count + 1; i++) {
      let btn = this.paginationButton(i, items);
      pagenumbers.appendChild(btn);
    }
  }

  paginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;
  
    if (this.current_page == page) {
      button.classList.add('active');
    }
  
    button.addEventListener('click', () => {
      this.current_page = page;
      
      this.displayList(items, this.rows, this.current_page);
      this.renderCards(this.rooms);
  
      let current_btn = document.querySelector('.pagenumbers button.active');
      current_btn.classList.remove('active');
  
      button.classList.add('active');
    });
  
    return button;
  }

  renderCards(cards) {
    this.cardsContainer.innerHTML = "";

    cards.map(card => {
      const div = document.createElement("div");
  
      div.className = "card";
    
      div.innerHTML = `
        <figure class="card__header">
          <img src="${card.photo}" alt="" />
        </figure>
        <div class="card__property">
          <span class="card__property__name">
            ${card.property_type}
          </span>
          <span class="card__status" role="img">
            <span class="card__star">
              <svg viewBox="0 0 1000 1000" role="presentation" aria-hidden="true" focusable="false" style="height: 12px; width: 12px; fill: currentcolor;">
                <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z"></path>
              </svg>
            </span>
            <span class="card__note">
              5.0
            </span>
          </span>
        </div>
        <div class="card__name">
          ${card.name}
        </div>
        <div class="card__price">
          <span class='card__price card__price--bold'>R$ ${card.price}</span>/mês
        </div>
      `;
      
      this.cardsContainer.appendChild(div);
    });
  };
}


new Main();