import { useAuth } from "../store/Auth";

export const Service = () => {
  const { services } = useAuth();
  console.log(services);

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Service</h1>
      </div>
      <div className="container grid grid-three-cols">
        {services.map((curElem, index) => (
          <div className="card" key={index}>
            <div className="card-img">
              <img src="/images/home.jpg" alt="our service info" width="100" />
            </div>
            <div className="card-details">
              <div className="grid grid-two-cols">
                <p>{curElem.provider}</p>
                <p>{curElem.price}</p>
                <p>{curElem.description}</p>
                <p>{curElem.service}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
