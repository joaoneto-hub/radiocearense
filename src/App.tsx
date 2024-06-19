import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    de: "",
    para: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.current) {
      setLoading(true);
      emailjs
        .sendForm("service_km0ta0u", "template_0e0zj2v", form.current, {
          publicKey: "7cLGIQlY_Xn3BK4qt",
          ...formData,
        })
        .then(
          () => {
            toast.success("Cartinha enviada com sucesso!❤️");
            setTimeout(() => {
              toast.success("A Rádio cearense agradece por sua cartinha!😊");
            }, 800);
            setFormData({ de: "", para: "", mensagem: "" });
            setLoading(false);
          },
          (error) => {
            toast.error("FAILED...", error.text);
            setLoading(false);
          }
        );
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <ToastContainer />
      <header className="flex justify-start items-center p-4 bg-orange-100">
        <h1 className="text-orange-500 text-2xl font-bold">Rádio Cearense</h1>
      </header>
      <Card className="max-w-md mx-auto p-4 mt-10">
        <CardTitle className="text-lg font-bold mb-2">
          ⬇️ Escreva sua cartinha aqui ⬇️
        </CardTitle>
        <CardDescription className="text-gray-600 mb-4">
          Faça a declaração de amor para a pessoa que você ama! ❤️
        </CardDescription>
        <form ref={form} onSubmit={handleSubmit}>
          <CardContent className="pt-10">
            <Input
              className="mb-4"
              placeholder="De:"
              name="de"
              value={formData.de}
              onChange={handleInputChange}
              required
            />
            <Input
              className="mb-4"
              placeholder="Para:"
              name="para"
              value={formData.para}
              onChange={handleInputChange}
              required
            />
            <Textarea
              className="mb-4"
              placeholder="Escreva sua mensagem..."
              rows={5}
              name="mensagem"
              value={formData.mensagem}
              onChange={handleInputChange}
              required
            />
            <Button
              className={`bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          </CardContent>
        </form>
      </Card>
      <div className="text-center mt-4">
        Feito com amor por: João Rodrigues ❤️
      </div>
    </>
  );
}

export default App;
