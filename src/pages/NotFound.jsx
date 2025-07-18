import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Lo sentimos, la página que buscas no existe."
    extra={
      <Button type="primary">
        <Link to="/home">Volver al inicio</Link>
      </Button>
    }
  />
);

export default NotFound;