
import { Box, Container, Typography } from "@mui/material";

const About = () => {
  return <>
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Sobre Nós
      </Typography>
      <Box>
        <Typography variant="body1" paragraph>
          Bem-vindo à nossa plataforma! Aqui, simplificamos sua jornada diária ao oferecer uma ferramenta intuitiva para visualizar, organizar e gerenciar horários de viagens. Nossa missão é ajudar você a encontrar as rotas mais convenientes e garantir que você tenha todas as informações de que precisa ao alcance das mãos.
        </Typography>
        <Typography variant="body1" paragraph>
          Com nossa tabela de horários, você pode facilmente ver em quais dias e horários suas viagens estão programadas, filtrar por dias específicos, e até mesmo gerenciar essas viagens, tudo em um único lugar. Se você tiver permissões especiais, nossa plataforma também permite a exclusão de viagens diretamente pela interface, tornando o gerenciamento ainda mais fácil.
        </Typography>
        <Typography variant="body1" paragraph>
          Nosso compromisso é fornecer uma experiência simples, eficiente e acessível para todos os nossos usuários, seja você um viajante comum ou alguém que precisa gerenciar várias rotas ao mesmo tempo. Estamos aqui para tornar seu dia a dia mais organizado e menos estressante.
        </Typography>
      </Box>
    </Container>
  </>;
};

export default About;
