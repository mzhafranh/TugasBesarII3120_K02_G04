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
-- Name: parking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parking (
    id_parking character varying(10) NOT NULL,
    location character varying(150) NOT NULL,
    current_capacity integer NOT NULL,
    total_capacity integer NOT NULL,
    price integer NOT NULL
);


ALTER TABLE public.parking OWNER TO postgres;

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
-- Data for Name: parking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parking (id_parking, location, current_capacity, total_capacity, price) FROM stdin;
P01	Parkiran MTC	50	70	3000
P02	Parkiran SMAN 5 Bandung	17	20	2000
P03	Parkiran SMAN 3 Bandung	20	30	2000
P04	Parkiran Centrum Bandung	10	50	2000
P05	Parkiran ITB	230	300	2000
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (email, username, password, role) FROM stdin;
admin@gmail.com	admin	$2b$10$TYJs..XStVWFMGPUPApWrO/Z9RP2MAov4hmQknUpmFEqApozy.BYm	admin
operator@gmail.com	operator	$2b$10$lJft0LhwjFaarACTq1XcM.OXdvQXnbvAYYRmm8ROxm8.QS3G38cb.	op
\.


--
-- Name: parking parking_location_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking
    ADD CONSTRAINT parking_location_key UNIQUE (location);


--
-- Name: parking parking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parking
    ADD CONSTRAINT parking_pkey PRIMARY KEY (id_parking);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);


--
-- PostgreSQL database dump complete
--

