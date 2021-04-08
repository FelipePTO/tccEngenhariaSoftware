import React, { useState } from 'react'
import { Button, Col, Form, Nav, Row, Tab, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { agendaJson } from '../../Service/retornarMedicos';
import { useRouter } from 'next/router';

/**
 * 
 * @returns O Paciente já vai estar logado com o usuário dele, então não precisa se identificar
 */
const index = () => {
    const router = useRouter();

    const [Especialidade, setEspecialidade] = useState("")
    const [Medico, setMedico] = useState("")
    const [Medicos, setMedicos] = useState([])
    const [Agenda, setAgenda] = useState([])
    const [Horarios, setHorarios] = useState(agendaJson)
    const [Observacao, setObservacao] = useState("")
    const [HorarioSelecionado, setHorarioSelecionado] = useState(null)

    const alteraEspecialidade = (especialidade) => {
        let _medicos = Horarios.filter(d=>d.especialidade==especialidade);
        let listaMedicos = _medicos.map(d=>d.nome);
        let listaMedicosUniq = [...new Set(listaMedicos)];
        setMedicos(listaMedicosUniq)
        setEspecialidade(especialidade)
    }

    const alterarMedico = (e) => {
        setMedico(e)
        let agenda = Horarios.filter(d=>d.especialidade==Especialidade && d.nome==e);
        setAgenda(agenda)
    }

    const confirmarAgenda = (d) =>{
        Horarios.map(p=>{
            if(p.id==d.id){
                p.status="Agendado"
            }
        })

        let agenda = Horarios.filter(d=>d.especialidade==Especialidade && d.nome==Medico);
        setAgenda(agenda)
        setHorarios(Horarios)
        setHorarioSelecionado(d)
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
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Especialidade</Form.Label>
                    <Form.Control onChange={(e)=>alteraEspecialidade(e.target.value)} as="select">
                        <option value=""></option>
                        <option value="Clinico Geral">Clinico Geral</option> 
                        <option value="Reumatologista">Reumatologista</option> 
                        <option value="Cardiologista">Cardiologista</option> 
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Médicos</Form.Label>
                    <Form.Control onChange={(e)=>alterarMedico(e.target.value)} as="select">
                        <option value=""></option>
                        {Medicos.map(d=>{
                            return <option value={d}>{d}</option> 
                        })}
                    </Form.Control>
                </Form.Group>
          

            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Dia</th>
                <th>Entrada</th>
                <th>Saída</th>
                <th>Agendar</th>
                </tr>
            </thead>
            <tbody>
                {Agenda.map(d=>{
                    if(d.status=="OK"){
                        return <tr>
                                    <td>{d.dia}</td>
                                    <td>{d["hora entrada"]}</td>
                                    <td>{d["hora saida"]}</td>
                                    <td>{HorarioSelecionado==null?<Button onClick={()=>confirmarAgenda(d)}>Seleciona</Button>:<></>}</td>
                                </tr>
                    }else{
                        return <tr style={{backgroundColor: "red", color: "white"}}>
                                    <td>{d.dia}</td>
                                    <td>{d["hora entrada"]}</td>
                                    <td>{d["hora saida"]}</td>
                                    <td></td>
                                </tr>
                    }
                })}
                
            </tbody>
            </Table>

            <h1>Dados da consulta</h1>
            {HorarioSelecionado!=null?<>Horario selecionado {HorarioSelecionado["hora entrada"]} até {HorarioSelecionado["hora saida"]} </>:""}
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Observação</Form.Label>
                <Form.Control onChange={(e)=>setObservacao(e.target.value)} value={Observacao} as="textarea" rows={4} type="text" />
            </Form.Group>
            </Form>
            <Button onClick={()=>alert("Consulta confirmada!")}>Confirmar Agenda</Button>
            </Col>
            </Row>
          
        </>
    )
}

export default index





