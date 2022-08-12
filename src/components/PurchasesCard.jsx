const PurchaseCard = ({ purchase }) => {
    return (
    <div className="purchases">
        <div className="purchases-container">
            {
                purchase.map((purcha) => (
                    <div className="purchases-info">
                        <div className="list-purchases">
                            <p className="list-p">{purcha.title}</p>
                            <p className="list-p">{purcha.price}</p>
                            <input type="text" value={purcha.productsInCart.quantity} className="quantity" readOnly/>
                        </div>                
                    </div>
                ))
            }
        </div>
    </div>
    );
};

export default PurchaseCard;