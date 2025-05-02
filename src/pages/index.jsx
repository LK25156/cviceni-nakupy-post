import { render } from '@czechitas/render';
import { ShopItem } from '../components/ShopItem';
import '../global.css';
import './index.css';

const response = await fetch('https://nakupy.czechitas.dev/api/mon')
const list = await response.json();

const HomePage = () => (
  <>
    <div className="banner"></div>
    <div className="container">
      <form className="newitem-form">
        <label htmlFor="input-name">Položka</label>
        <input id="input-name" type="text" />
        <label htmlFor="input-amount">Množství</label>
        <input id="input-amount" type="text" />
        <label htmlFor="input-unit">Jednotka</label>
        <input id="input-unit" type="text" />
        <button className="btn-add">Přidat</button>
      </form>
      <div className="shoplist">
        {list.map((item) => (
          <ShopItem 
            key={item.id}
            id={item.id}
            name={item.product}
            amount={item.amount + ' ' + item.unit}
            bought={item.done}
          />
        ))}
      </div>
    </div>
  </>
);

document.querySelector('#root').innerHTML = render(<HomePage />);

const handleSubmit = async (event) => {
  event.preventDefault();
}

    const nameInput = document.querySelector('#input-name');
    const amountInput = document.querySelector('#input-amount');
    const unitInput = document.querySelector('#input-unit');

    const body = {
      product: nameInput.value,
      amount: Number(amountInput.value),
      unit: unitInput.value,
      done: false,
    };

    const resp = await fetch ("https://nakupy.czechitas.dev/api/mon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

   if (!resp.ok) {
    alert("Něco se nepovedlo, zkuste to za chvíli znovu.");
   } else {
    window.location.reload();
   };
  

const handleDelete = async (event) => {
  const id = event.target.dataset.id;
  const resp = await fetch(`https://nakupy.czechitas.dev/api/mon/${id}`, {
    method: "DELETE",
  });

  if(!resp.ok) {
    alert("Něco se nepovedlo, zkuste to za chvíli znovu.");
  } else {
    window.location.reload();
  }
};

const handleTick = async (event) => {
  const id = event.target.dataset.id;
  const resp = await fetch(`https://nakupy.czechitas.dev/api/mon/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({done: true}),
  });

  if (!resp.ok) {
    alert("Něco se nepovedlo, zkuste to za chvíli znovu.");
  } else {
    window.location.reload();
  }
};

document.querySelector("form").addEventListener("submit", handleSubmit);
document
  .querySelectorAll(".btn-delete")
  .forEach((element) => element.addEventListener("click", handleDelete));
document
  .querySelectorAll(".btn-tick")
  .forEach((element) => element.addEventListener("click", handleTick));

    


