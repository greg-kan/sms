-- with t1 as (
-- --select lower(doc_code) doc_code_l
-- select lower(split_part(doc_code, '#', 1)) doc_code_l, doc_code
-- from public.agsk_document
-- order by doc_code
-- ),
-- t2 as (
-- select name, lower(split_part(name, '.', 1)) AS first_part
-- from public.files1
-- order by lower(split_part(name, '.', 1))
-- ),
-- t3 as (
--     select t1.doc_code_l, t1.doc_code,
--            t2.name,
--            t2.first_part,
--            row_number() over (partition by t1.doc_code_l) as numb,
--            count(*) over (partition by t1.doc_code_l) as cnt
--     from t1
--              left join t2 on t2.first_part = t1.doc_code_l
-- --where doc_code_l is null; --or first_part is null;
-- )

-- update public.agsk_document ad
-- set attached_file_name = (
--     select file_name
--     from public.files_doc_code fdc
--     where ad.doc_code = fdc.doc_code
-- )


-- insert into public.files_doc_code (file_name, doc_code)
--     (select --lower(split_part(ad.doc_code, '#', 1)) doc_code_l,
--                    f1.name,
--                    ad.doc_code--,
--                    --lower(split_part(f1.name, '.', 1)) AS  first_part
--             from public.agsk_document ad
--                      left join public.files1 f1
--                                on lower(split_part(f1.name, '.', 1)) = lower(split_part(ad.doc_code, '#', 1))
--             order by ad.doc_code)





