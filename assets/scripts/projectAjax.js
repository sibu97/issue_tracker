{
    // ajax request to create new project and add into the the home page
    let createProject = function(){
        console.log('hello there');
        let newProjectForm = $('#project-create-form');
        // submitting form
        newProjectForm.submit(function(e){
            e.preventDefault();
            $('#modal').css('display', 'none');
            console.log('hello');
            $.ajax({
                type: 'post',
                url: '/project/create',
                data: newProjectForm.serialize(), 
                success: function(data){
                    console.log(data);
                    // creating project dom
                    let project = newProjectDOM(data.data.project);
                    // appending project into the home page
                    $('#projects-list').append(project);
                },
                // if error occured
                error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }
    // creating new project dom
    function newProjectDOM(project){
        return $(`<div class="project">
                    <ul style="list-style-type: none;"> 
                            <a href="/project/info/${project._id}" style="text-decoration:none;">
                                <li>
                                <h2 style="text-align: center;">${project.name}</h2> 
                                    <span>Description : ${project.description}</span>
                                    <br>
                                    <span>Author : ${project.author}</span> <br>
                                    <span style="color: #e22945;">Issues:&nbsp; ${project.issues.length} </span> 
                                </li>
                            </a>
                    </ul>
                </div>`)
    }
    createProject();
}
