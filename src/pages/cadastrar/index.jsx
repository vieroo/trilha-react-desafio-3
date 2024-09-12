import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

import { useForm } from "react-hook-form";

import {
  Container,
  Title,
  Column,
  TitleLogin,
  SubtitleLogin,
  PoliticasText,
  Row,
  Wrapper,
  LoginText,
} from "./styles";

const Cadastrar = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.post("/users", formData);
      alert("Conta criada com sucesso! Faça login para acessar.");
      navigate("/login");
    } catch (e) {
      console.log("Houve um erro", e);
    }
  };

  console.log("errors", errors);

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Comece agora grátis!</TitleLogin>
            <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Nome Completo"
                leftIcon={<MdPerson />}
                name="fullname"
                control={control}
              />
              {errors.fullname && <span>Nome Completo é obrigatório</span>}
              <Input
                placeholder="E-mail"
                leftIcon={<MdEmail />}
                name="email"
                control={control}
              />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input
                type="password"
                placeholder="Senha"
                leftIcon={<MdLock />}
                name="senha"
                control={control}
              />
              {errors.senha && <span>Senha é obrigatório</span>}
              <Button
                title="Criar minha conta"
                variant="secondary"
                type="submit"
              />
            </form>
            <Row>
              <PoliticasText>
                <p>
                  Ao clicar em "criar minha conta grátis", declaro que aceito as
                  Políticas de Privacidade e os Termos de Uso da DIO.
                </p>
                <LoginText>
                  Ja tenho conta. <span>Entrar</span>
                </LoginText>
              </PoliticasText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Cadastrar };
