import React from 'react';

const Invoice = () => {
    const [description, setDescription] = React.useState<string>("");
    const [price, setPrice] = React.useState<string>("");
    const [alert, setAltert] = React.useState<string>("");
  
    const downloadFilePdf = () => {
      if (description?.length < 2 || price?.length < 1) {
        setAltert("The description or price is empty");
        setTimeout(()=>{
          setAltert("");
        },2000);
        return;
      }
  
      const user_id = localStorage.getItem('userId');
  
      fetch("http://localhost:3001/file/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ description, price, user_id }),
      })
      .then(async (filePdf: any) => {
        const blob = await filePdf.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
  
        setDescription("");
        setPrice("");
      });
    };
    
    return (
        <>
        {alert && (
            <div className="alert">
                <span>{alert}</span>
            </div>
        )}
        <h1>Ajoute ta facture</h1>
        <div className="container">
            <div className="inputBox">
            <label htmlFor="">Description</label>
            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
            />
            </div>
            <div className="inputBox">
            <label htmlFor="">Prix</label>
            <input
                value={price?.toString()}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
            />
            </div>
            <button onClick={downloadFilePdf}>Télécharger ma facture</button>
        </div>
        </>
    );
};

export default Invoice;