import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SGS Fácil
        </h1>


        <div className={styles.grid}>
          <a href="/estoqueFarmacia" className={styles.card}>
            <h3>Estoque Farmácia</h3>
            <p>Verificar estoque da farmácia </p>
          </a>

          <a href="/internarPaciente" className={styles.card}>
            <h3>Internar Paciente</h3>
            <p>Solicitar internação de um paciente</p>
          </a>

          <a
            href="/agendamentoConsulta"
            className={styles.card}
          >
            <h3>Agendar Consultas</h3>
            <p>Agendar consulta</p>
          </a>
        </div>
      </main>
    </div>
  )
}
