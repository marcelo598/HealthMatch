--
-- PostgreSQL database dump
--

\restrict 48hhshTOjzTFEpPnQ0kbb02hLYCl2ymdwhpptnsJXggPQvifnkUSUyAIlDRaatP

-- Dumped from database version 17.11
-- Dumped by pg_dump version 17.11

-- Started on 2026-10-05 14:56:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16436)
-- Name: marcelo; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA marcelo;


ALTER SCHEMA marcelo OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16422)
-- Name: consultas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consultas (
    id_consulta integer NOT NULL,
    id_usuario integer NOT NULL,
    nome_medico character varying(100),
    especialidade character varying(100),
    data_consulta date,
    horario time without time zone,
    observacoes text,
    avaliacao integer,
    comentario text,
    CONSTRAINT chk_avaliacao CHECK (((avaliacao IS NULL) OR ((avaliacao >= 1) AND (avaliacao <= 5))))
);


ALTER TABLE public.consultas OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16421)
-- Name: consultas_id_consulta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consultas_id_consulta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consultas_id_consulta_seq OWNER TO postgres;

--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 220
-- Name: consultas_id_consulta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consultas_id_consulta_seq OWNED BY public.consultas.id_consulta;


--
-- TOC entry 219 (class 1259 OID 16398)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nome character varying(100) NOT NULL,
    cpf character varying(14),
    data_nascimento date,
    email character varying(100),
    senha character varying(100) NOT NULL,
    aceite_lgpd boolean DEFAULT false NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16397)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 218
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4750 (class 2604 OID 16425)
-- Name: consultas id_consulta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultas ALTER COLUMN id_consulta SET DEFAULT nextval('public.consultas_id_consulta_seq'::regclass);


--
-- TOC entry 4748 (class 2604 OID 16401)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 4909 (class 0 OID 16422)
-- Dependencies: 221
-- Data for Name: consultas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.consultas (id_consulta, id_usuario, nome_medico, especialidade, data_consulta, horario, observacoes, avaliacao, comentario) FROM stdin;
\.


--
-- TOC entry 4907 (class 0 OID 16398)
-- Dependencies: 219
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nome, cpf, data_nascimento, email, senha, aceite_lgpd) FROM stdin;
1	marcelo augusto marinho	\N	\N	marceloalgustoguto84@gmail.com	marcelo	f
\.


--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 220
-- Name: consultas_id_consulta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.consultas_id_consulta_seq', 1, false);


--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 218
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 1, true);


--
-- TOC entry 4759 (class 2606 OID 16430)
-- Name: consultas consultas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT consultas_pkey PRIMARY KEY (id_consulta);


--
-- TOC entry 4753 (class 2606 OID 16405)
-- Name: usuarios usuarios_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cpf_key UNIQUE (cpf);


--
-- TOC entry 4755 (class 2606 OID 16407)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4757 (class 2606 OID 16403)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4760 (class 2606 OID 16431)
-- Name: consultas fk_consulta_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consultas
    ADD CONSTRAINT fk_consulta_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


-- Completed on 2026-10-05 14:56:20

--
-- PostgreSQL database dump complete
--

\unrestrict 48hhshTOjzTFEpPnQ0kbb02hLYCl2ymdwhpptnsJXggPQvifnkUSUyAIlDRaatP

