import React, { useState } from 'react'
import { Button, Col, Form, Nav, Row, Tab } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

const index = () => {

    const router = useRouter();
    const [endDate, setEndDate] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())

    const [Obj, setObj] = useState({})

    const solicitarInternacao = () =>{
        if(Obj.nome==null || 
            Obj.nome=="" ||
            Obj.idade==null || 
            Obj.sexo==null || 
            Obj.motivo==null || 
            Obj.motivo=="" ||
            Obj.tipo==null || 
            Obj.observacao==null || 
            Obj.observacao=="" ||
            moment().isAfter(moment(startDate), 'day') ||
            moment().isAfter(moment(endDate), 'day')  ||
            moment(startDate).isAfter(moment(endDate))||
            typeof parseInt(Obj.idade) !='number'||
            Obj?.idade<0
            ){
                alert("Algum campo não foi preenchido corretamente")
                console.log(Obj)
            }else{
                alert("Agendado com sucesso")
                console.log(Obj)
            }
    }

    return (
        <>
        <Row>
            <Col xs={2}>
                <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                activeKey="/home"
                onSelect={selectedKey => router.push(selectedKey)}
                >
                    <div className="sidebar-sticky"></div>
                    <Nav.Item>
                        <Nav.Link href="/">Inicio</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/estoqueFarmacia">Estoque Farmacia</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/internarPaciente">Internar Paciente</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/agendamentoConsulta">Agendamento Consulta</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Col>
            <Col xs={10}>
                <Row className="justify-content-center">
                    <Form style={{width: "50%", marginTop: "50px"}}>
                        <Row style={{justifyContent: "space-around", width: "100%"}}>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <label>Entrada</label>
                                <DatePicker dateFormat={"dd/MM/yyyy"} selected={startDate} onChange={date => setStartDate(date)} />
                            </div>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <label>Saída</label>                                
                                <DatePicker dateFormat={"dd/MM/yyyy"} selected={endDate} onChange={date => setEndDate(date)} />
                            </div>
                        </Row>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control onChange={(e)=>setObj({...Obj, nome: e.target.value})} value={Obj.nome} type="text" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Idade</Form.Label>
                            <Form.Control onChange={(e)=>setObj({...Obj, idade: e.target.value})} value={Obj.idade} type="number" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Sexo</Form.Label>
                            <Form.Control onChange={(e)=>setObj({...Obj, sexo: e.target.value})} value={Obj.sexo} as="select">
                            <option value=""></option>    
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Motivo Internação</Form.Label>
                            <Form.Control onChange={(e)=>setObj({...Obj, motivo: e.target.value})} value={Obj.motivo} type="text" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Tipo de internação</Form.Label>
                            <Form.Control onChange={(e)=>setObj({...Obj, tipo: e.target.value})} value={Obj.tipo} as="select">
                            <option value=""></option>
                            <option>Não urgente</option>
                            <option>Urgente</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Observação</Form.Label>
                            <Form.Control onChange={(e)=>setObj({...Obj, observacao: e.target.value})} value={Obj.observacao} as="textarea" rows={4} />
                        </Form.Group>
                        <Button onClick={()=>solicitarInternacao()}>Solicitar internação</Button>
                    </Form>
                    </Row>
                </Col>
            </Row>
          
        </>
       
    )
}

export default index





