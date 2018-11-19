import React, { Component, Fragment } from 'react';
import Header from './Header';
import Brocha from '../assets/img/brocha.jpg';
import Deco from '../assets/img/brocha-polvos-maquillaje.jpg';

// const Consultant = ({ consultantInfo }) => {
//   console.log(consultantInfo)
// }

class ContactConsultant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consultantCode: null,
      consultants: [
        {
          code: 123456,
          name: 'Ailim Moscoso',
          phoneNumber: 980671333,
          email: 'ailim.moscoso@gmail.com',
          coordinates: {
            lat: -12.1369698,
            lng: -77.0224273
          }
        },
        {
          code: 654321,
          name: 'Miluska González',
          phoneNumber: 933500732,
          email: 'miluska.gonzalezar@gmail.com',
          coordinates: {
            lat: -12.1369698,
            lng: -77.0224273
          }
        },
        {
          code: 554433,
          name: 'Mely Hidalgo',
          phoneNumber: 929940441,
          email: 'mely.hidalgo.crespo@gmail.com',
          coordinates: {
            lat: -12.1369698,
            lng: -77.0224273
          }
        },
        {
          code: 334455,
          name: 'Nataly Porras',
          phoneNumber: 953211790,
          email: 'natalypc27@gmail.com',
          coordinates: {
            lat: -12.1369698,
            lng: -77.0224273
          }
        }
      ]
    }
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      consultantCode: value,
    })
  }

  handleMap = (googleMap, consultants) => {
    const createMarker = (consultant) => {
      // Creamos un marcador
      const marker = new google.maps.Marker({
        map: map,
        position: consultant.coordinates
      });

      // Asignamos el evento click del marcador
      google.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(consultant.name);
        infowindow.open(map);
      });
    }

    let map;
    let infowindow;

    // Creamos un mapa con las coordenadas actuales
    navigator.geolocation.getCurrentPosition(pos => {

      lat = pos.coords.latitude;
      lon = pos.coords.longitude;

      const myLatlng = new google.maps.LatLng(lat, lon);
      const mapOptions = {
        center: myLatlng,
        zoom: 15,
      };

      map = new google.maps.Map(googleMap, mapOptions);

      // Creamos el infowindow
      infowindow = new google.maps.InfoWindow();
      consultants.forEach(colocationMarker => createMarker(colocationMarker))
    });
  }

  render() {
    return (
      <Fragment>
        <Header itemsCount={this.props.itemsCount} />
        <div className="container d-flex flex-column align-items-center mt-4">
          <form className="">
            <div className="form-group">
              <label for="exampleFormControlInput1">Escribe tu correo:</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" />
            </div>
            <div className="form-group">
              <label for="exampleFormControlInput1">Teléfono*</label>
              <input type="number" className="form-control" id="exampleFormControlInput1" />
            </div>
            <p><b>Si ya tienes una consultora:</b></p>
            <div className="form-group">
              <input onChange={this.handleChange} type="number" className="form-control" id="exampleFormControlInput1" placeholder="Ingresa su código aquí" />
            </div>
            {
              this.state.consultantCode === "123456"
                ? (
                  <div className="">
                    <fieldset disabled>
                      <div className="form-group">
                        <label for="disabledTextInput">Nombre de consultora</label>
                        <input type="text" id="disabledTextInput" className="form-control" defaultValue={this.state.consultants[0].name} />
                      </div>
                      <div className="form-group">
                        <label for="disabledPhone">Teléfono</label>
                        <input id="disabledPhone" className="form-control" defaultValue={this.state.consultants[0].phoneNumber} />
                      </div>
                      <div className="form-group">
                        <label for="disabledEmail">Email</label>
                        <input id="disabledEmail" className="form-control" defaultValue={this.state.consultants[0].email} />
                      </div>
                    </fieldset>
                    <div className="d-flex mb-3">
                      <button className="btn btn-danger btn-width" type="button" data-toggle="modal" data-target="#message-consultant"> Realizar pedido </button>
                    </div>
                    <div className="modal fade" id="message-consultant" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-body">
                            <button type="button" className="close m-3" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-5">
                                  <img className="img-fluid" src={Deco} alt="Brocha de maquillaje" />
                                </div>
                                <div className="col-7 mt-4 d-flex align-items-center">
                                  <div className="d-flex flex-column text-center">
                                    <p>Tu lista de pedidos fue enviada a tu consultora, muy pronto ella se comunicara contigo para coordinar la entrega.</p>
                                    <p>¿Deseas la copia del pedido en tu correo?</p>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" aria-label="Close">Sí</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                : null
            }
            <div className="form-group">
              <div className="checkbox">
                <p>
                  <b>O si aún no tienes una, búscala por:</b>
                </p>
                <p>
                  <input type="checkbox" id="ubication" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" />
                  <label for="ubication">Ubicación</label>
                </p>
              </div>
            </div>
            <div id="collapseTwo" aria-expanded="true" className="collapse in">
              <div>
                <div className="img-fluid" id="google-map">{this.handleMap(document.getElementById('google-map'), this.state.consultants)}</div>
                <p className="mt-3 mb-3">Estas son las consultoras que se encuentran más cerca a ti. Selecciona una:</p>
                <div className="list-group">
                  {this.state.consultants.map(({ code, name, phoneNumber, email }, i) => {
                    return (
                      <div key={i}>
                        <div className="list-group-item list-group-item-action" data-toggle="modal" data-target={`#consultant${i}`}>
                          <span>{i + 1}. {name}</span>
                        </div>
                        <div className="modal fade" id={`consultant${i}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-body">
                                <button type="button" className="close m-3" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="text-secondary m-4">
                                  <p className="mb-1">Nombre de la consultora</p>
                                  <p className="mb-2">{name}</p>
                                  <p className="mb-1">Código</p>
                                  <p className="mb-2">{code}</p>
                                  <p className="mb-1">Teléfono</p>
                                  <p className="mb-2">{phoneNumber}</p>
                                  <p className="mb-1">Correo</p>
                                  <p className="mb-2">{email}</p>
                                </div>
                                <div className="container-fluid">
                                  <div className="row">
                                    <div className="col-5">
                                      <img className="img-fluid" src={Deco} alt="Brocha de maquillaje" />
                                    </div>
                                    <div className="col-7 d-flex align-items-center">
                                      <div className="d-flex flex-column text-center">
                                        <p>Recuerda comunicarte con tu consultora y ella coordinará la entrega de tus productos.</p>
                                        <p>¿Deseas la copia del pedido en tu correo?</p>
                                        <button type="button" className="btn btn-danger" data-dismiss="modal" aria-label="Close">Sí</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </form>
          <img src={Brocha} className="img-fluid" />
        </div>
      </Fragment>
    )
  }
};

export default ContactConsultant;