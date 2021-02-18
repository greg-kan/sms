with base as (
    select t2.id, t1.doc_code
    from public.agsk_source t1
    join public.agsk_document_type t2 on t2.code = t1.doc_type
)

update public.agsk_document a1
set type_id = (select id from base
                where base.doc_code = a1.doc_code);



select * from base;

select *
from public.agsk_document