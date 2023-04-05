{
    // ajax request for diaplaying issues after asdding filters
    let filterForm = function(){
        let newFilterForm = $('#filter-form');
        newFilterForm.submit(function(e){
            e.preventDefault();
            $('#issue-container').html("");

            $.ajax({
                type: 'post',
                url: '/project/filter',
                data: newFilterForm.serialize(),
                success: function(data){
                    console.log(data);
                    for(let issue of data.data.issues){
                        // creating new dom
                        let filterResult = newfilterDOM(issue);
                        // appending it into the container
                        $('#issue-container').append(filterResult);
                        $(`#label-${issue._id}`).html("");
                        // appending all issue labels
                        for(let label of issue.labels){
                            let labelDOM = newLabelDOM(label);
                            $(`#label-${issue._id}`).append(labelDOM);
                        }
                    }  
                }
            })
        })
    }
    // creating neww issue DOM
    function newfilterDOM(issue){
        return $(`<div id="issue">
                    <div style="text-align: center;">
                        <h2 class="green">${issue.title} </h2>
                    </div>
                    <p><span class="green">Issue Description </span> : ${issue.description}</p>
                    <p><span class="green">Author </span> : ${issue.author} </p>
                    <p><span class="green">Issue - Labels</span> :</p>
                    <div id="label-${issue._id}">
                        
                    </div>
                </div>`)
    }
    // creating label dom for issue
    function newLabelDOM(label){
        return $(`<span class="label">${label}</span>`)
    }
    filterForm();
}