import { useState } from 'react';
import axios from 'axios';

function AdicionaProduto() {
  const [produto, setProduto] = useState({
    nome: '',
    valor: '',
    quantidade: '',
    cor: '',
    descricao: ''
  });
  const [carregando, setCarregando] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCarregando(true);
    try {
      const data = JSON.stringify(produto);
      const response = await axios.post('http://localhost/backend-ABP-front/produto/add', data, {});
      console.log(response.data);
      setIsFormSubmitted(true);
      setProduto({
        nome: '',
        valor: '',
        quantidade: '',
        cor: '',
        descricao: ''
      });
    }
    catch (error) {
      console.error(error);
    }
    setCarregando(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduto(prevProduto => ({ ...prevProduto, [name]: value }));
  };

  return (
    <div className='container'>
      <div className="bg-black-div/90 border border-white rounded-xl  my-20 py-12 px-8">
        <form id='formProduto' className='flex flex-col space-y-12' onSubmit={handleSubmit}>
          <input className='ml-5 bg-black-input text-white rounded px-4 py-3' placeholder='Nome' type="text" name="nome" value={produto.nome} onChange={handleChange} />
          <input className='ml-5 bg-black-input text-white rounded px-4 py-3' placeholder='Valor' type="number" name="valor" value={produto.valor} onChange={handleChange} />
          <input className='ml-5 bg-black-input text-white rounded px-4 py-3' placeholder='Quantidade' type="number" name="quantidade" value={produto.quantidade} onChange={handleChange} />
          <input className='ml-5 bg-black-input text-white rounded px-4 py-3' placeholder='cor' type="text" name="cor" value={produto.cor} onChange={handleChange} />
          <input className='ml-5 bg-black-input text-white rounded px-4 py-3' placeholder='Descrição' type="text" name="descricao" value={produto.descricao} onChange={handleChange} />
          <button className='text-white flex w-1/4 mx-auto justify-center items-center bg-blue-high rounded p-5 transition-all hover:bg-blue-light' type="submit" disabled={carregando}>
            {carregando ? <img src="../../public/svg/loading_white.svg" className='w-9 h-9' /> : 'Enviar'}
          </button>
          {isFormSubmitted && <p className='text-white'>Formulário enviado com sucesso!</p>}
        </form>
      </div>
    </div>
  );
}

export default AdicionaProduto;
