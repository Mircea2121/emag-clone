import React , { useState } from "react";
import "../data/Checkout.css";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";


function Checkout({ cart, setCart }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        adress: "",
        payment: "cash",
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
            .map(item => `• ${item.name} x ${item.quantity || 1} (${item.price} €)`
            ).join("<br>");

            console.log("Produse trimise:", produseText);
            

         setIsLoading(true)
          emailjs.send(
            "service_uoeev58",
            "template_o9dbob8",
            {
              user_name: formData.name,
              user_email: formData.email,
              user_phone: formData.phone,
              user_address: formData.adress,
              payment_method: formData.payment,
              produse_comandate: produseText,
            },
            "jAJ8yM3KNMeSj45Nq"
          )
          .then(
            (response) => {
              console.log("Email sent successfully", response.status);
              setIsLoading(false);
              setSuccess(true)
              alert("Your order has been placed successfully!");

              localStorage.removeItem("cart");
              setCart([]);

               setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  adress: "",
                  payment: "cash",
        });
        navigate("/thank-you")
            },
            (error) => {
              console.error("There was an error sending the email:", error.text);
              setIsLoading(false);
              alert("An error occurred. Please try again!");
            }
          );
    };

    return (
        <div className="checkout-page">
          <div className="checkout-card">
            <h2>Complete Order</h2>
            {isLoading && <p>⏳ Placing order...</p>}
            <form onSubmit={handleSubmit} className="checkout-form">
  <label>
    Full name🧑:
    <input
      type="text"
      name="name"
      value={formData.name}
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
    Phone📞:
    <input
      type="text"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      required
    />
  </label>

  <label>
    Shipping address🏠:
    <textarea
      name="adress"
      value={formData.adress}
      onChange={handleChange}
      required
    />
  </label>

  <label>
    Payment method💳:
    <select
      name="payment"
      value={formData.payment}
      onChange={handleChange}
      required
    >
      <option value="cash">Cash on delivery (COD)</option>
      <option value="card">Credit or debit card</option>
      <option value="transfer">Bank transfer</option>
    </select>
  </label>

  <button type="submit">Place order</button>
        </form>
     </div>
 </div>
    );
}

export default Checkout;
