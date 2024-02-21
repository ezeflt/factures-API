import PDFDocument from "pdfkit";
import { WriteStream } from "fs";

interface invoiceData {
    username: string
    items: {
        description: string
        price: number
    }
    fileStream: WriteStream
}

export class FilePdf {
    private date: string; 
    private username: string; 
    private description: string; 
    private price: number; 
    private fileStream: WriteStream;

    constructor(props: invoiceData) {
        this.date = new Date().toUTCString().substring(0, 16);
        this.username = props.username
        this.description = props.items.description
        this.price = props.items.price
        this.fileStream = props.fileStream
    }

    private generateTitle = (pdf: any) => {
        pdf.fontSize(15)
            .text(`Date: ${this.date}`, { align: "right"})
            .text(`${this.username}`, { align: "left" })
            .moveDown();

        pdf.fontSize(30)
            .text(`Facture`.toUpperCase(), 
            { align: "center"})
            .moveDown();
    }

    private writeTotal = (pdf: any) => {
        pdf.moveDown()
            .text(`Total: ${this.price}`, 
            { align: "right" });
    }

    private writeItemAndPrice = (pdf: any) => {
        const xDescriptionTitle = 100;
        const yPriceTitle = 200;

        const xDescriptionData = 100;
        const yPriceData = 250;

        pdf.moveDown()
            .fontSize(12)
            .text("Description", xDescriptionTitle, yPriceTitle, 
            { width: 200 })
            .text("Prix", 
            { align: "right" });

        pdf.fontSize(10);
        pdf.text(this.description, xDescriptionData, yPriceData, { width: 200 });
        pdf.text(this.price.toFixed, { align: "right", lineGap: 3 });
    }

    private writeLigne = (pdf: any) => {
        pdf
            .moveDown()
            .moveDown()
            .lineWidth(1)
            .moveTo(100, pdf.y)
            .lineTo(500, pdf.y)
            .stroke();
    }
    
    public addPage = () => {
        const pdf = new PDFDocument();

        pdf.pipe(this.fileStream);

        this.generateTitle(pdf);

        this.writeItemAndPrice(pdf);

        this.writeLigne(pdf);

        this.writeTotal(pdf);

        pdf.end();
    }
}
