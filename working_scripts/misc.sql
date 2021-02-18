SELECT * FROM public.terms_def
where lower(term) = 'участок' --like '%часто%';

SELECT * FROM public.terms
where lower(term) = 'участок' --like '%часто%';

SELECT * FROM public.v_def_mismatches
where lower(term) like '%часто%';

SELECT * FROM public.agsk11
where doc_name like '%жданский Коде%'

select a.id, d.id, d.code, d.name, a.doc_name, a.doc_type
FROM public.agsk11 a
inner join public.docs d on lower(a.doc_name) like '%' || lower(substring(d.name, 1, length(d.name) - 1 )) || '%'
--inner join public.docs d on lower(a.doc_name) like '%' || lower(d.name) || '%'
order by a.id

select * 
FROM public.agsk11 a
where a.doc_type like '%ГОСТ 24767-81%'

SELECT nextval('word_docs_id_seq'); 

select *, '1213' aaa -- row_number() over -- повторяющиеся agsk11.id
from
(select * from public.word_docs1 wd
right join public.agsk11 ag on ag.doc_name = wd.doc_name) base
where base.index is null
