import { defineField, defineType } from "sanity";
export const Blog = defineType({
    name: "blog",
    title:"Blog",
    type:"document",
    fields:[
        defineField({
            name: "title",
            type: "string",
          }),
        defineField({
            name:"slug",
            type:"slug",
            options:{
                source:'title'
            }
        }),
        defineField({
            name:"author",
            type:"reference",
            to:{type:"author"},
        }),
        defineField({
            name:"views",
            type:"number"
        }),
        defineField({
            name:"description",
            type:"text"
        }),
        defineField({
            name:"category",
            type:"string",
            validation:(Rule)=>Rule.min(1).max(20).required().error("Please Enter a category")
        }),
        defineField({
            name:"image",
            type:"url"
        }),
        defineField({
            name:"blog",
            type:"markdown"
        }),
    ],
    preview:{
        select:{
            title:'title'
        }
    }

});