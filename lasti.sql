--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    email character varying(150) NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    role character varying(50)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (email, username, password, role) FROM stdin;
admin@gmail.com	admin	$2b$10$TYJs..XStVWFMGPUPApWrO/Z9RP2MAov4hmQknUpmFEqApozy.BYm	admin
operator@gmail.com	operator	$2b$10$lJft0LhwjFaarACTq1XcM.OXdvQXnbvAYYRmm8ROxm8.QS3G38cb.	op
\.


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);


--
-- PostgreSQL database dump complete
--

