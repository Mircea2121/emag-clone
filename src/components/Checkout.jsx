import React , { useState } from "react";
import "../data/Checkout.css";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";


function Checkout({ cart, setCart }) {
    const [formData, setFormData] = useState({
        nume: "",
        email: "",
        telefon: "",
        adresa: "",
        plata: "cash",
    });

    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((perv) => ({ ...perv, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("Cart items:", cartItems);
        
        const produseText = cartItems
            .map(item => `• ${item.name} x ${item.quantity || 1} (${item.price} RON)`
            ).join("<br>");

            console.log("Produse trimise:", produseText);
            

         setIsLoading(true)
          emailjs.send(
            "service_uoeev58",
            "template_o9dbob8",
            {
              user_name: formData.nume,
              user_email: formData.email,
              user_phone: formData.telefon,
              user_address: formData.adresa,
              payment_method: formData.plata,
              produse_comandate: produseText,
            },
            "jAJ8yM3KNMeSj45Nq"
          )
          .then(
            (response) => {
              console.log("Email trimis cu succes!", response.status);
              setIsLoading(false);
              setSuccess(true)
              alert("Comanda ta a fost trimisă cu succes!");

              localStorage.removeItem("cart");
              setCart([]);

               setFormData({
                  nume: "",
                  email: "",
                  telefon: "",
                  adresa: "",
                  plata: "cash",
        });
        navigate("/thank-you")
            },
            (error) => {
              console.error("Eroarea la trimiterea emailului:", error.text);
              setIsLoading(false);
              alert("A apărut o eroare. Încearcă din nou!");
            }
          );
    };

    return (
        <div className="checkout-page">
          <div className="checkout-card">
            <h2>Finalizare comandă</h2>
            {isLoading && <p>⏳ Se trimite comanda...</p>}
            <form onSubmit={handleSubmit} className="checkout-form">
  <label>
    Nume complet🧑:
    <input
      type="text"
      name="nume"
      value={formData.nume}
      onChange={handleChange}
      required
    />
  </label>

  <label>
    Email📧:
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </label>

  <label>
    Telefon📞:
    <input
      type="text"
      name="telefon"
      value={formData.telefon}
      onChange={handleChange}
      required
    />
  </label>

  <label>
    Adresă de livrare🏠:
    <textarea
      name="adresa"
      value={formData.adresa}
      onChange={handleChange}
      required
    />
  </label>

  <label>
    Metodă de plată💳:
    <select
      name="plata"
      value={formData.plata}
      onChange={handleChange}
      required
    >
      <option value="cash">Ramburs (cash)</option>
      <option value="card">Card bancar</option>
      <option value="transfer">Transfer bancar</option>
    </select>
  </label>

  <button type="submit">Trimite comanda</button>
        </form>
     </div>
 </div>
    );
}

export default Checkout;
