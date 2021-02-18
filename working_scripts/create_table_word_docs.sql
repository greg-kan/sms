-- Table: public.word_docs

-- DROP TABLE public.word_docs;

CREATE TABLE public.word_docs
(
    id bigint NOT NULL DEFAULT nextval('word_docs_id_seq'::regclass), --( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
	code	 character varying COLLATE pg_catalog."default", --Первая колонка 
    doc_code character varying COLLATE pg_catalog."default",
    doc_type text COLLATE pg_catalog."default", --Шифр
    doc_name text COLLATE pg_catalog."default",
    done boolean,
    CONSTRAINT word_docs_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.word_docs
    OWNER to postgres;
