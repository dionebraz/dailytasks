import Countdown from 'react-countdown';
import './styles.css';

const natalGif = 'https://i.pinimg.com/originals/e8/0c/f3/e80cf36f4eb13dca261438a58d39b390.gif';

const Header = () => {
  // Defina a data de destino para o Natal de 2023 (ano, mês - 1, dia)
  const targetDate = new Date(2023, 11, 25);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Se o countdown estiver concluído, exiba uma mensagem
      return <p>Natal chegou!</p>;
    } else {
      // Se o countdown ainda está em andamento, exiba os dias, horas, minutos e segundos restantes
      return (
        <div>
          <p className="weekDay">{`${new Date().toLocaleDateString('pt-BR', { weekday: 'long' })}`}</p>
          <p className="daysOfChristmas">{`${days}d ${hours}h ${minutes}m ${seconds}s Para o natal!`}</p>
        </div>
      );
    }
  };

  return (
    <header className="header">
      <img src={natalGif} alt="GIF Natalino Kawaii" className="background-gif" />
      <div className="content">
        <Countdown date={targetDate} renderer={renderer} />
      </div>
    </header>
  );
};

export default Header;
