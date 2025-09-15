--
-- PostgreSQL database dump
--

\restrict LJLWVXqThTiDwTjInvs5XXXobc7ebQkeGnAD6sLJDg3BCTKb6Pm5WEX8eN7i6tr

-- Dumped from database version 17.6 (Ubuntu 17.6-0ubuntu0.25.04.1)
-- Dumped by pg_dump version 17.6 (Ubuntu 17.6-0ubuntu0.25.04.1)

-- Started on 2025-09-14 22:52:24 EEST

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
-- TOC entry 6 (class 2615 OID 16912)
-- Name: public; Type: SCHEMA; Schema: -; Owner: heroapp
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO heroapp;

--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: heroapp
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 2 (class 3079 OID 16945)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16924)
-- Name: hero; Type: TABLE; Schema: public; Owner: heroapp
--

CREATE TABLE public.hero (
    id uuid NOT NULL,
    nickname text NOT NULL,
    real_name text,
    origin_description text,
    superpowers text,
    catch_phrase text
);


ALTER TABLE public.hero OWNER TO heroapp;

--
-- TOC entry 219 (class 1259 OID 16931)
-- Name: hero_images; Type: TABLE; Schema: public; Owner: heroapp
--

CREATE TABLE public.hero_images (
    id uuid NOT NULL,
    hero_id uuid NOT NULL,
    image_url text NOT NULL
);


ALTER TABLE public.hero_images OWNER TO heroapp;

--
-- TOC entry 3473 (class 0 OID 16924)
-- Dependencies: 218
-- Data for Name: hero; Type: TABLE DATA; Schema: public; Owner: heroapp
--

COPY public.hero (id, nickname, real_name, origin_description, superpowers, catch_phrase) FROM stdin;
\.


--
-- TOC entry 3474 (class 0 OID 16931)
-- Dependencies: 219
-- Data for Name: hero_images; Type: TABLE DATA; Schema: public; Owner: heroapp
--

COPY public.hero_images (id, hero_id, image_url) FROM stdin;
\.


--
-- TOC entry 3326 (class 2606 OID 24902)
-- Name: hero_images hero_images_pkey; Type: CONSTRAINT; Schema: public; Owner: heroapp
--

ALTER TABLE ONLY public.hero_images
    ADD CONSTRAINT hero_images_pkey PRIMARY KEY (id);


--
-- TOC entry 3323 (class 2606 OID 24879)
-- Name: hero hero_pkey; Type: CONSTRAINT; Schema: public; Owner: heroapp
--

ALTER TABLE ONLY public.hero
    ADD CONSTRAINT hero_pkey PRIMARY KEY (id);


--
-- TOC entry 3324 (class 1259 OID 16938)
-- Name: hero_images_image_url_key; Type: INDEX; Schema: public; Owner: heroapp
--

CREATE UNIQUE INDEX hero_images_image_url_key ON public.hero_images USING btree (image_url);


--
-- TOC entry 3327 (class 2606 OID 24910)
-- Name: hero_images hero_images_hero_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: heroapp
--

ALTER TABLE ONLY public.hero_images
    ADD CONSTRAINT hero_images_hero_id_fkey FOREIGN KEY (hero_id) REFERENCES public.hero(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: heroapp
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-09-14 22:52:24 EEST

--
-- PostgreSQL database dump complete
--

\unrestrict LJLWVXqThTiDwTjInvs5XXXobc7ebQkeGnAD6sLJDg3BCTKb6Pm5WEX8eN7i6tr

