--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.5
-- Dumped by pg_dump version 10.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: clusters; Type: TABLE; Schema: public; Owner: wasifzaman
--

CREATE TABLE clusters (
    id integer NOT NULL,
    text character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE clusters OWNER TO wasifzaman;

--
-- Name: clusters_id_seq; Type: SEQUENCE; Schema: public; Owner: wasifzaman
--

CREATE SEQUENCE clusters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE clusters_id_seq OWNER TO wasifzaman;

--
-- Name: clusters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wasifzaman
--

ALTER SEQUENCE clusters_id_seq OWNED BY clusters.id;


--
-- Name: machinedata; Type: TABLE; Schema: public; Owner: wasifzaman
--

CREATE TABLE machinedata (
    id integer NOT NULL,
    phrase character varying(255),
    category character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE machinedata OWNER TO wasifzaman;

--
-- Name: machinedata_id_seq; Type: SEQUENCE; Schema: public; Owner: wasifzaman
--

CREATE SEQUENCE machinedata_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE machinedata_id_seq OWNER TO wasifzaman;

--
-- Name: machinedata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wasifzaman
--

ALTER SEQUENCE machinedata_id_seq OWNED BY machinedata.id;


--
-- Name: thoughts; Type: TABLE; Schema: public; Owner: wasifzaman
--

CREATE TABLE thoughts (
    id integer NOT NULL,
    text character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE thoughts OWNER TO wasifzaman;

--
-- Name: thoughts_id_seq; Type: SEQUENCE; Schema: public; Owner: wasifzaman
--

CREATE SEQUENCE thoughts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE thoughts_id_seq OWNER TO wasifzaman;

--
-- Name: thoughts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wasifzaman
--

ALTER SEQUENCE thoughts_id_seq OWNED BY thoughts.id;


--
-- Name: clusters id; Type: DEFAULT; Schema: public; Owner: wasifzaman
--

ALTER TABLE ONLY clusters ALTER COLUMN id SET DEFAULT nextval('clusters_id_seq'::regclass);


--
-- Name: machinedata id; Type: DEFAULT; Schema: public; Owner: wasifzaman
--

ALTER TABLE ONLY machinedata ALTER COLUMN id SET DEFAULT nextval('machinedata_id_seq'::regclass);


--
-- Name: thoughts id; Type: DEFAULT; Schema: public; Owner: wasifzaman
--

ALTER TABLE ONLY thoughts ALTER COLUMN id SET DEFAULT nextval('thoughts_id_seq'::regclass);


--
-- Data for Name: clusters; Type: TABLE DATA; Schema: public; Owner: wasifzaman
--

COPY clusters (id, text, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: machinedata; Type: TABLE DATA; Schema: public; Owner: wasifzaman
--

COPY machinedata (id, phrase, category, "createdAt", "updatedAt") FROM stdin;
1	could barely sleep last	rest	2017-10-26 18:27:08.107-04	2017-10-26 18:27:08.107-04
2	hard bed we slept on	rest	2017-10-26 18:27:08.108-04	2017-10-26 18:27:08.108-04
3	touring London	travel	2017-10-26 18:27:08.108-04	2017-10-26 18:27:08.108-04
4	the hard bed	furniture	2017-10-26 18:27:08.109-04	2017-10-26 18:27:08.109-04
6	visit London	vacation	2017-10-26 18:27:08.109-04	2017-10-26 18:27:08.109-04
5	visit London	travel	2017-10-26 18:27:08.109-04	2017-10-26 18:27:08.109-04
7	complimentary breakfast.	food	2017-10-26 18:27:08.109-04	2017-10-26 18:27:08.109-04
8	tea	food	2017-10-26 18:27:08.109-04	2017-10-26 18:27:08.109-04
9	pastries	food	2017-10-26 18:27:08.109-04	2017-10-26 18:27:08.109-04
10	hotel	vacation	2017-10-26 18:27:08.109-04	2017-10-26 18:27:08.109-04
11	pancakes	food	2017-10-26 18:27:08.109-04	2017-10-26 18:27:08.109-04
12	getting tickets	entertainment	2017-10-26 18:27:08.109-04	2017-10-26 18:27:08.109-04
13	Buckingham Palace	travel	2017-10-26 18:27:08.11-04	2017-10-26 18:27:08.11-04
14	to a show for the evening	entertainment	2017-10-26 18:27:08.11-04	2017-10-26 18:27:08.11-04
15	public transportation	commute	2017-10-26 18:27:08.11-04	2017-10-26 18:27:08.11-04
16	The tube	commute	2017-10-26 18:27:08.11-04	2017-10-26 18:27:08.11-04
17	ride	exercise	2017-10-26 18:27:08.11-04	2017-10-26 18:27:08.11-04
18	actual palace	travel	2017-10-26 18:27:08.11-04	2017-10-26 18:27:08.11-04
19	it was such a nice day	weather	2017-10-26 18:27:08.11-04	2017-10-26 18:27:08.11-04
20	new dream home	home	2017-10-26 18:27:08.11-04	2017-10-26 18:27:08.11-04
21	the Palace grounds are absolutely gorgeous	travel	2017-10-26 18:27:08.11-04	2017-10-26 18:27:08.11-04
22	The gardens	outdoors	2017-10-26 18:27:08.11-04	2017-10-26 18:27:08.11-04
23	getting hungry	food	2017-10-26 18:27:08.111-04	2017-10-26 18:27:08.111-04
24	pictures	photography	2017-10-26 18:27:08.11-04	2017-10-26 18:27:08.11-04
25	lunch	food	2017-10-26 18:27:08.111-04	2017-10-26 18:27:08.111-04
26	pub nearby	drinks	2017-10-26 18:27:08.111-04	2017-10-26 18:27:08.111-04
27	authentic British pub	drinks	2017-10-26 18:27:08.111-04	2017-10-26 18:27:08.111-04
28	authentic British pub	social	2017-10-26 18:27:08.111-04	2017-10-26 18:27:08.111-04
29	really hungry and tired	food	2017-10-26 18:27:08.111-04	2017-10-26 18:27:08.111-04
30	tired	rest	2017-10-26 18:27:08.111-04	2017-10-26 18:27:08.111-04
31	food and drink	food	2017-10-26 18:27:08.111-04	2017-10-26 18:27:08.111-04
32	food and drink	drinks	2017-10-26 18:27:08.111-04	2017-10-26 18:27:08.111-04
33	The pub	social	2017-10-26 18:27:08.111-04	2017-10-26 18:27:08.111-04
34	taking a taxi	commute	2017-10-26 18:27:08.111-04	2017-10-26 18:27:08.111-04
35	They were from Texas	travel	2017-10-26 18:27:08.112-04	2017-10-26 18:27:08.112-04
36	sights	travel	2017-10-26 18:27:08.112-04	2017-10-26 18:27:08.112-04
37	double decker bus	commute	2017-10-26 18:27:08.112-04	2017-10-26 18:27:08.112-04
38	River Thames	travel	2017-10-26 18:27:08.112-04	2017-10-26 18:27:08.112-04
39	Big Ben	travel	2017-10-26 18:27:08.112-04	2017-10-26 18:27:08.112-04
40	Parliament building	politics	2017-10-26 18:27:08.112-04	2017-10-26 18:27:08.112-04
41	Parliament building	travel	2017-10-26 18:27:08.112-04	2017-10-26 18:27:08.112-04
42	picture taken	photography	2017-10-26 18:27:08.112-04	2017-10-26 18:27:08.112-04
43	tea house	rest	2017-10-26 18:27:08.112-04	2017-10-26 18:27:08.112-04
44	afternoon tea	leisure	2017-10-26 18:27:08.112-04	2017-10-26 18:27:08.112-04
45	eating our scones	food	2017-10-26 18:27:08.112-04	2017-10-26 18:27:08.112-04
46	much needed rest	rest	2017-10-26 18:27:08.113-04	2017-10-26 18:27:08.113-04
47	our hotel	travel	2017-10-26 18:27:08.113-04	2017-10-26 18:27:08.113-04
48	for dinner	food	2017-10-26 18:27:08.113-04	2017-10-26 18:27:08.113-04
49	the show	entertainment	2017-10-26 18:27:08.113-04	2017-10-26 18:27:08.113-04
50	bistro	food	2017-10-26 18:27:08.113-04	2017-10-26 18:27:08.113-04
51	romantic	romance	2017-10-26 18:27:08.113-04	2017-10-26 18:27:08.113-04
52	restaurant	food	2017-10-26 18:27:08.113-04	2017-10-26 18:27:08.113-04
53	show choice	entertainment	2017-10-26 18:27:08.113-04	2017-10-26 18:27:08.113-04
54	the theatre	entertainment	2017-10-26 18:27:08.113-04	2017-10-26 18:27:08.113-04
55	straight to bed	rest	2017-10-26 18:27:08.113-04	2017-10-26 18:27:08.113-04
56	cafe for some coffee	rest	2017-10-26 18:27:08.113-04	2017-10-26 18:27:08.113-04
57	passed out	rest	2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
58	Paris	travel	2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
59	it all down on paper	blogging	2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
60			2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
61	geometry quiz	learning	2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
62	studied	learning	2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
63	pop quiz	learning	2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
64	history	history	2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
65	homework	learning	2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
66	read	learning	2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
67	reading	learning	2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
68	breakup with	social	2017-10-26 18:27:08.114-04	2017-10-26 18:27:08.114-04
69	hanging out	social	2017-10-26 18:27:08.115-04	2017-10-26 18:27:08.115-04
70	friend	social	2017-10-26 18:27:08.115-04	2017-10-26 18:27:08.115-04
71	huge paper due	learning	2017-10-26 18:27:08.115-04	2017-10-26 18:27:08.115-04
72	Spanish	learning	2017-10-26 18:27:08.115-04	2017-10-26 18:27:08.115-04
73	Spanish	travel	2017-10-26 18:27:08.115-04	2017-10-26 18:27:08.115-04
74	best friend	social	2017-10-26 18:27:08.115-04	2017-10-26 18:27:08.115-04
76			2017-10-26 18:27:08.115-04	2017-10-26 18:27:08.115-04
75	yellow to a deep red	art	2017-10-26 18:27:08.115-04	2017-10-26 18:27:08.115-04
77	the machine	tech	2017-10-26 18:27:08.115-04	2017-10-26 18:27:08.115-04
78	six months	time	2017-10-26 18:27:08.115-04	2017-10-26 18:27:08.115-04
79	hemodialysis	health	2017-10-26 18:27:08.115-04	2017-10-26 18:27:08.115-04
80	sick	health	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
81	less healthy	health	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
82	chronic glomerulonephritis	health	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
83	high school	learning	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
84	scientific explanation	learning	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
85	kidneys	health	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
86	doctors	health	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
87	disease	health	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
88	body	health	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
89	bodily	health	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
91	toxins	health	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
90	plugged	tech	2017-10-26 18:27:08.116-04	2017-10-26 18:27:08.116-04
92	machine	tech	2017-10-26 18:27:08.117-04	2017-10-26 18:27:08.117-04
93	dreams	ponder	2017-10-26 18:27:08.117-04	2017-10-26 18:27:08.117-04
94	kidney failure	health	2017-10-26 18:27:08.117-04	2017-10-26 18:27:08.117-04
95	crayon	art	2017-10-26 18:27:08.117-04	2017-10-26 18:27:08.117-04
96	innermost thoughts	ponder	2017-10-26 18:27:08.117-04	2017-10-26 18:27:08.117-04
97	writing	writing	2017-10-26 18:27:08.117-04	2017-10-26 18:27:08.117-04
98	souls	diety	2017-10-26 18:27:08.117-04	2017-10-26 18:27:08.117-04
99	lessons	learning	2017-10-26 18:27:08.117-04	2017-10-26 18:27:08.117-04
100			2017-10-26 18:27:08.118-04	2017-10-26 18:27:08.118-04
101	present	focus	2017-10-26 18:27:08.118-04	2017-10-26 18:27:08.118-04
102	focus	focus	2017-10-26 18:27:08.118-04	2017-10-26 18:27:08.118-04
103	professors and peers	learning	2017-10-26 18:27:08.118-04	2017-10-26 18:27:08.118-04
104	insights	learning	2017-10-26 18:27:08.118-04	2017-10-26 18:27:08.118-04
105	digital	tech	2017-10-26 18:27:08.118-04	2017-10-26 18:27:08.118-04
106	distraction	entertainment	2017-10-26 18:27:08.119-04	2017-10-26 18:27:08.119-04
107	dance	entertainment	2017-10-26 18:27:08.119-04	2017-10-26 18:27:08.119-04
108	students	learning	2017-10-26 18:27:08.119-04	2017-10-26 18:27:08.119-04
109	general education	learning	2017-10-26 18:27:08.119-04	2017-10-26 18:27:08.119-04
110	college	learning	2017-10-26 18:27:08.119-04	2017-10-26 18:27:08.119-04
111	liberal arts	learning	2017-10-26 18:27:08.119-04	2017-10-26 18:27:08.119-04
112	technical skills	learning	2017-10-26 18:27:08.119-04	2017-10-26 18:27:08.119-04
113	college education	learning	2017-10-26 18:27:08.12-04	2017-10-26 18:27:08.12-04
114	long term learning	learning	2017-10-26 18:27:08.12-04	2017-10-26 18:27:08.12-04
116	dry material	learning	2017-10-26 18:27:08.12-04	2017-10-26 18:27:08.12-04
120	diversity	social	2017-10-26 18:27:08.121-04	2017-10-26 18:27:08.121-04
126	dance	social	2017-10-26 18:27:08.121-04	2017-10-26 18:27:08.121-04
130			2017-10-26 18:27:08.122-04	2017-10-26 18:27:08.122-04
117	growth opportunity	learning	2017-10-26 18:27:08.121-04	2017-10-26 18:27:08.121-04
122	disagreements force you to defend your viewpoints	learning	2017-10-26 18:27:08.121-04	2017-10-26 18:27:08.121-04
127	friends	social	2017-10-26 18:27:08.122-04	2017-10-26 18:27:08.122-04
118	perfect practice	learning	2017-10-26 18:27:08.12-04	2017-10-26 18:27:08.12-04
123	challenge your assumptions	learning	2017-10-26 18:27:08.121-04	2017-10-26 18:27:08.121-04
128	Techie friends	tech	2017-10-26 18:27:08.122-04	2017-10-26 18:27:08.122-04
119	peers	social	2017-10-26 18:27:08.121-04	2017-10-26 18:27:08.121-04
124	college friends	social	2017-10-26 18:27:08.121-04	2017-10-26 18:27:08.121-04
129	International students	social	2017-10-26 18:27:08.122-04	2017-10-26 18:27:08.122-04
132	hello	greeting	2017-10-26 18:31:28.311-04	2017-10-26 18:31:28.311-04
148	helloooooo	learning	2017-10-28 00:11:41.995-04	2017-10-28 00:11:41.995-04
151	helloooooo	social	2017-10-28 00:11:41.995-04	2017-10-28 00:11:41.995-04
133	amazon	travel	2017-10-26 19:22:38.277-04	2017-10-26 19:22:38.277-04
149	helloooooo	travel	2017-10-28 00:11:41.995-04	2017-10-28 00:11:41.995-04
134	car	travel	2017-10-26 19:22:54.398-04	2017-10-26 19:22:54.398-04
135	car	pleasure	2017-10-26 19:22:58.438-04	2017-10-26 19:22:58.438-04
150	helloooooo	food	2017-10-28 00:11:41.995-04	2017-10-28 00:11:41.995-04
136	I am happy	emotional	2017-10-26 20:30:44.904-04	2017-10-26 20:30:44.904-04
152	helloooooo	health	2017-10-28 00:11:41.995-04	2017-10-28 00:11:41.995-04
137	politics	politics	2017-10-26 20:43:30.802-04	2017-10-26 20:43:30.802-04
153	helloooooo	greeting	2017-10-28 00:15:08.798-04	2017-10-28 00:15:08.798-04
138	Hello, introspect. I am currently presenting at a stackathon and it is quite frightening!	hacking	2017-10-26 22:10:36.156-04	2017-10-26 22:10:36.156-04
139	Hello, introspect. I am currently presenting at a stackathon and it is quite frightening!	coding	2017-10-26 22:10:43.101-04	2017-10-26 22:10:43.101-04
154	helloooooo	greeting	2017-10-28 00:16:18.336-04	2017-10-28 00:16:18.336-04
155	helloooooo	tech	2017-10-28 00:16:18.336-04	2017-10-28 00:16:18.336-04
140	I've an idea!	idea	2017-10-27 13:41:02.858-04	2017-10-27 13:41:02.858-04
156	the world is a circus	travel	2017-10-28 00:18:10.276-04	2017-10-28 00:18:10.276-04
141	I realized I love dogs.	pets	2017-10-27 19:08:36.06-04	2017-10-27 19:08:36.06-04
157	the world is a circus	travel	2017-10-28 00:18:29.552-04	2017-10-28 00:18:29.552-04
142	I'm very good with cats.	pets	2017-10-27 19:09:04.054-04	2017-10-27 19:09:04.054-04
158	the world is a circus	adventure	2017-10-28 00:19:01.282-04	2017-10-28 00:19:01.282-04
143	Hello, world!	coding	2017-10-27 19:23:22.742-04	2017-10-27 19:23:22.742-04
159	Mike's app idea is pretty cool. It gives you nutritional values on food.	idea	2017-10-28 10:22:09.401-04	2017-10-28 10:22:09.401-04
160	Mike's app idea is pretty cool. It gives you nutritional values on food.	drinks	2017-10-28 10:22:09.401-04	2017-10-28 10:22:09.401-04
161	Mike's app idea is pretty cool. It gives you nutritional values on food.	adventure	2017-10-28 10:22:09.402-04	2017-10-28 10:22:09.402-04
162	Mike's app idea is pretty cool. It gives you nutritional values on food.	pleasure	2017-10-28 10:22:09.402-04	2017-10-28 10:22:09.402-04
144	I'm training this bot!	learning	2017-10-27 19:42:37.668-04	2017-10-27 19:42:37.668-04
163	Mike's app idea is pretty cool. It gives you nutritional values on food.	exercise	2017-10-28 10:22:09.402-04	2017-10-28 10:22:09.402-04
145	I love eating halal street food!	food	2017-10-27 19:42:57.903-04	2017-10-27 19:42:57.903-04
164	Mike's app idea is pretty cool. It gives you nutritional values on food.	food	2017-10-28 10:22:09.402-04	2017-10-28 10:22:09.402-04
146	My cat and dog gets along just fine.	pets	2017-10-27 19:46:19.807-04	2017-10-27 19:46:19.807-04
165	nutrition	food	2017-10-28 10:22:32.509-04	2017-10-28 10:22:32.509-04
147	helping the bot learn	tech	2017-10-27 20:34:47.348-04	2017-10-27 20:34:47.348-04
166	App idea: sell giant headphones	app	2017-10-28 10:34:00.686-04	2017-10-28 10:34:00.686-04
167	App idea: sell giant headphones	app	2017-10-28 10:34:24.693-04	2017-10-28 10:34:24.693-04
168	App idea: headphones are really cool	music	2017-10-28 10:35:33.237-04	2017-10-28 10:35:33.237-04
115	class	learning	2017-10-26 18:27:08.12-04	2017-10-26 18:27:08.12-04
121	academic	learning	2017-10-26 18:27:08.121-04	2017-10-26 18:27:08.121-04
125	student athlete	sports	2017-10-26 18:27:08.121-04	2017-10-26 18:27:08.121-04
131	athlete	sports	2017-10-26 18:27:08.122-04	2017-10-26 18:27:08.122-04
\.


--
-- Data for Name: thoughts; Type: TABLE DATA; Schema: public; Owner: wasifzaman
--

COPY thoughts (id, text, "createdAt", "updatedAt") FROM stdin;
49	hello world, this is my first thought.	2017-10-28 11:29:49.981-04	2017-10-28 11:29:49.981-04
50	Recording two thoughts now.	2017-10-28 11:29:57.807-04	2017-10-28 11:29:57.807-04
51	Writing a thought to stream	2017-10-28 11:33:32.143-04	2017-10-28 11:33:32.143-04
\.


--
-- Name: clusters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wasifzaman
--

SELECT pg_catalog.setval('clusters_id_seq', 1, false);


--
-- Name: machinedata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wasifzaman
--

SELECT pg_catalog.setval('machinedata_id_seq', 168, true);


--
-- Name: thoughts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: wasifzaman
--

SELECT pg_catalog.setval('thoughts_id_seq', 51, true);


--
-- Name: clusters clusters_pkey; Type: CONSTRAINT; Schema: public; Owner: wasifzaman
--

ALTER TABLE ONLY clusters
    ADD CONSTRAINT clusters_pkey PRIMARY KEY (id);


--
-- Name: machinedata machinedata_pkey; Type: CONSTRAINT; Schema: public; Owner: wasifzaman
--

ALTER TABLE ONLY machinedata
    ADD CONSTRAINT machinedata_pkey PRIMARY KEY (id);


--
-- Name: thoughts thoughts_pkey; Type: CONSTRAINT; Schema: public; Owner: wasifzaman
--

ALTER TABLE ONLY thoughts
    ADD CONSTRAINT thoughts_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

