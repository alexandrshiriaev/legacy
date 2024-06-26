PGDMP      8                |            ExpenseAccountingSystem    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    98355    ExpenseAccountingSystem    DATABASE     �   CREATE DATABASE "ExpenseAccountingSystem" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1251';
 )   DROP DATABASE "ExpenseAccountingSystem";
                postgres    false            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   pg_database_owner    false    5            �            1259    98509    tickets    TABLE     �   CREATE TABLE public.tickets (
    id integer NOT NULL,
    retailplace character varying(255) NOT NULL,
    totalsum double precision NOT NULL,
    datetime date NOT NULL,
    mcc integer NOT NULL,
    workerid integer NOT NULL
);
    DROP TABLE public.tickets;
       public         heap    Taras    false            �            1259    98512    tickets_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.tickets_id_seq;
       public          Taras    false    215            �           0    0    tickets_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;
          public          Taras    false    216            �            1259    98513    trips    TABLE     �   CREATE TABLE public.trips (
    id integer NOT NULL,
    datestart date NOT NULL,
    dateend date NOT NULL,
    workerid integer NOT NULL
);
    DROP TABLE public.trips;
       public         heap    Taras    false            �            1259    98516    trips_id_seq    SEQUENCE     �   CREATE SEQUENCE public.trips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.trips_id_seq;
       public          Taras    false    217            �           0    0    trips_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.trips_id_seq OWNED BY public.trips.id;
          public          Taras    false    218            �            1259    98517    workers    TABLE     q  CREATE TABLE public.workers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    role boolean NOT NULL,
    folder character varying(255) DEFAULT NULL::character varying,
    password character varying(255),
    login character varying(255),
    token character varying,
    CONSTRAINT workers_check CHECK (((role IS FALSE) OR (folder IS NULL)))
);
    DROP TABLE public.workers;
       public         heap    Taras    false            �            1259    98524    workers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.workers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.workers_id_seq;
       public          Taras    false    219            �           0    0    workers_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.workers_id_seq OWNED BY public.workers.id;
          public          Taras    false    220            Z           2604    98525 
   tickets id    DEFAULT     h   ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);
 9   ALTER TABLE public.tickets ALTER COLUMN id DROP DEFAULT;
       public          Taras    false    216    215            [           2604    98526    trips id    DEFAULT     d   ALTER TABLE ONLY public.trips ALTER COLUMN id SET DEFAULT nextval('public.trips_id_seq'::regclass);
 7   ALTER TABLE public.trips ALTER COLUMN id DROP DEFAULT;
       public          Taras    false    218    217            \           2604    98527 
   workers id    DEFAULT     h   ALTER TABLE ONLY public.workers ALTER COLUMN id SET DEFAULT nextval('public.workers_id_seq'::regclass);
 9   ALTER TABLE public.workers ALTER COLUMN id DROP DEFAULT;
       public          Taras    false    220    219            `           2606    98529    tickets tickets_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_pkey;
       public            Taras    false    215            b           2606    98531    trips trips_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.trips DROP CONSTRAINT trips_pkey;
       public            Taras    false    217            d           2606    98533    workers workers_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.workers DROP CONSTRAINT workers_pkey;
       public            Taras    false    219            e           2606    98534    tickets tickets_workerid_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_workerid_fkey FOREIGN KEY (workerid) REFERENCES public.trips(id);
 G   ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_workerid_fkey;
       public          Taras    false    217    4706    215            f           2606    98539    trips trips_workerid_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_workerid_fkey FOREIGN KEY (workerid) REFERENCES public.workers(id);
 C   ALTER TABLE ONLY public.trips DROP CONSTRAINT trips_workerid_fkey;
       public          Taras    false    217    4708    219           