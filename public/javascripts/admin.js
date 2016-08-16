/**
 * Created by CoderSong on 16/8/16.
 */
$(function () {
    $('#deleteBtn').click(function () {
        var id = $(this).attr('data-id');
        var url = "/delete/" + id;
        $.ajax({
            url:url,
            type:'DELETE',
            success:function () {
                location.href = "/admin/list"
            }
        })
    })
});